let Code =          require('../models/code');
let presaleReport = require('../report_utilities/presale-report');
let util =          require('../util');

const CODE_LENGTH = 8;
const MAX_CODE_GEN = 5000;
const CODE_CHARS = [
    '3', '4', '6', '7', '8', '9', 'A',
    'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'J', 'K', 'M', 'N', 'P', 'Q', 'R',
    'T', 'U', 'V', 'W', 'X', 'Y'
];

exports.getAll = (req, res) => {
    Code.find()
        .then(codes => {
            res.json({
                success: true,
                data: codes
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: err
            })
        });
};

exports.check = (req,res) => {
    let code = req.body.code;
    console.log('Check code ' + code + ' for validity...');

    // Check database for submitted code
    Code.find({ code })
        .then(result => {
            if(!result[0]){
                console.log('Returning false');
                res.json({ valid: false });
            } else if(result[0].available){
                console.log('Returning result: { valid: true }');
                res.json({ valid: true })
            } else if(result) {
                console.log('Returning false');
                res.json({ valid: false, message: 'That code has already been redeemed'});
            }
        })
};

exports.generate = (req, res) => {
    let qty = req.body.qty;
    let batch = req.body.batch;

    console.log(req.body);

    if(qty < 0 && qty > MAX_CODE_GEN) {
        res.json({
            success: false,
            message: 'Requested quantity out of bounds (1 - 5000)'
        });
    }

    generateCodes(qty, batch)
        .then(codes => {
            let filename = 'presale_' + batch.replace(' ', '-') + '_' + util.date() + '.csv';
            return Promise.all([
                Code.create(codes),
                presaleReport.generate(
                    filename,
                    codes.map(c => {
                        c.available = true;
                        return c;
                        // New codes are available
                        // Report generator expects { code, available }
                    })
                )
            ]);
        })
        .then(result => {
            res.json({ success: true, data: result[0], filename: result[1] });
            // result[0] : db write
            // result[1] : report generation
        })
        .catch(err => {
            console.log('error: ' + err);
            res.json({ success: false, message: err });
        });
};

function generateCodes(count, batch){
    // Retrieve all codes, process locally, push all new codes once
    return Code.find()
        .then(existing => {
            let checkCodes = [];
            let addCodes = [];

            // While fewer than request codes have been generated
            while(!addCodes.length || addCodes.length < count){
                checkCodes = getCodeSet(count - addCodes.length || count);
                for(let c in checkCodes){

                    // If !exist, push to addCodes
                    if(checkKeep(checkCodes[c], existing)){
                        addCodes.push({ code: checkCodes[c], batch: batch });
                    }
                }
            }
            return addCodes;
        });
}

function checkKeep(code, existing){
    for(let e = 0; e < existing.length; e++){
        if(code === e){
            return 0;
        }
    }
    return code;
}

function getCodeSet(count){
    let code;
    let codes = [];

    // Once for each code
    for(let i = 0; i < count; i++){

        code = "";

        // Once for each place
        for(let p = 0; p < CODE_LENGTH; p++){
            code += getRandomValidChar();
        }

        codes.push(code);
    }

    return codes;
}

function getRandomValidChar(){
    return CODE_CHARS[
        Math.floor(Math.random() * CODE_CHARS.length)
        ];
}

