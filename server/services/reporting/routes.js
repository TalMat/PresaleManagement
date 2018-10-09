let Report =            require('./model');
let Inventory =         require('../inventory/model');
let util =              require('./formatter');
let productionReport =  require('./generators/production-report');
let shippingReport =    require('./generators/shipping-report');
let invoiceReport =     require('./generators/invoice-report');
let fs =                require('fs');
let path =              require('path');

let mongoose =          require('mongoose');
let Grid = require('gridfs-stream');
let GridFS;

let MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL)
    .then( () => {
        console.log('Connected to MongoDB using Mongoose. (reporting/routes)')
        GridFS = Grid(mongoose.connection.db, mongoose.mongo);
    })
    .catch( err => {
        console.log('Error connecting to MongoDB using Mongoose... (reporting/routes)');
        console.log(err);
    });

function writeFile(path, name, callback){
    let writeStream = GridFS.createWriteStream({
        filename: name
    });
    writeStream.on('close', (file) => {
        callback(null, file);
    });
    fs.createReadStream(path).pipe(writeStream);
}

exports.getAll = (req, res) => {
    Report.find()
        .then(reports => {
            res.json({ success: true, data: reports });
        })
        .catch(err => {
            res.json({ sucess: false, message: err });
        })
};

exports.newProduction = (orders) => {
    let filename = 'production_' + util.date() + '.pdf';
    let newReport = {
        kind: 'production',
        filename: filename,
        description: describe(orders),
        order_codes: orders.map(o => o.code),
        date: Date.now() // Date is returned client for sorting
    };

    // Promises to create file and write to database
    let writeDatabase = Report.create(newReport);
    let createFile = productionReport.generate(filename, orders)
        .then(filename => {
            console.log(`Production report filename: ${filename}`);
        })
        .catch(err => {
            console.log(`Error generating new production report.`);
            console.log(err);
        });

    let counts = orders.reduce(function(res, o){
        if(res[o.size] !== undefined){
            res[o.size]++;
        } else {
            res[o.size] = 1;
        }
        return res;
    }, {});

    let inventoryUpdate = Inventory.create({
        kind: 'production',
        description: 'Automated production inventory',
        counts
    });

    return Promise.all([createFile, writeDatabase, inventoryUpdate]).then((reportData) => {
        return {
            filename: filename,
            report: newReport
        }
    });
};

exports.newShipment = (orders) => {
    let filename = 'shipping_' + util.date() + '.csv';
    let newReport = {
        kind: 'shipping',
        filename: filename,
        description: describe(orders),
        order_codes: orders.map(o => o.code),
        date: Date.now() // Date is returned client for sorting
    };

    // Promises to create file and write to database
    let writeDatabase = Report.create(newReport);
    let createFile = shippingReport.generate(filename, orders);

    return Promise.all([createFile, writeDatabase]).then((reportData) => {
        return {
            filename: filename,
            report: newReport
        }
    });
};

exports.newInvoice = (orders) => {
    let filename = 'invoice_' + util.date() + '.pdf';
    let newReport = {
        kind: 'invoice',
        filename: filename,
        description: describe(orders),
        order_codes: orders.map(o => o.code),
        date: Date.now() // Date is returned client for sorting
    };

    // Promises to create file and write to database
    let writeDatabase = Report.create(newReport);
    let createFile = invoiceReport.generate(filename, orders);

    return Promise.all([createFile, writeDatabase]).then((reportData) => {
        return {
            filename: filename,
            report: newReport
        };
    });
};

exports.newGeneral = () => {

};

exports.newPresale = () => {

};

exports.download = (req, res) => {
    Report.findOne({_id: req.body.id})
        .then(report => {
            let filename = report.filename;

            fs.stat('./reports/' + filename, (err, stat) => {
                if(err){
                    console.log(`Error loading report file:`);
                    console.log(err);
                    res.json({ success: false, message: err })
                } else {
                    res.json({ success: true, filename: filename })
                }
            });
        });
};

exports.file = (req, res) => {

    let filepath = path.join(__dirname, '../../reports/', req.params.file);
    res.download(filepath);
};

function describe(o){
    let first = o.reduce((a, b) => (a.namedrop < b.namedrop) ? a : b );
    let last = o.reduce((a, b) => (a.namedrop > b.namedrop) ? a : b );
    return o.length + ' orders | ' + first.namedrop + ' ... ' + last.namedrop;
    // Example:     31 orders | ANNA RULES ... ZIA FO FIA
}
