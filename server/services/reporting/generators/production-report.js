let fs = require('fs');
let path = require('path');
let Pdf = require('pdfkit');
let util = require('../formatter');
let moment = require('moment');

let report;
const L_MARGIN = 50;
const SIZE_BLANK = {
    'y-xs': 0,      'y-s': 0,       'y-m': 0,       'y-l': 0,
    'a-s': 0,       'a-m': 0,       'a-l': 0,       'a-xl': 0,
    'a-2xl': 0,     'a-3xl': 0,     'a-4xl': 0,     'a-5xl': 0
};
const SIZE_MAP = {
    'y-xs': 'Youth XS',     'y-s': 'Youth S',       'y-m': 'Youth M',
    'y-l': 'Youth L',       'a-s': 'Adult S',       'a-m': 'Adult M',
    'a-l': 'Adult L',       'a-xl': 'Adult XL',     'a-2xl': 'Adult 2XL',
    'a-3xl': 'Adult 3XL',   'a-4xl': 'Adult 4XL',   'a-5xl': 'Adult 5XL'
};

function generateReport(filename, orders){

    return new Promise((res, rej) => {

        if(orders.length > 0){
            report = new Pdf;
            printSummaryCover(orders);

            // Presort to put pages in order
            orders.sort((a, b) => a.namedrop.localeCompare(b.namedrop));

            for(let i = 0; i < orders.length; i++){
                console.log(`order: ${orders[i]}`);
                printOrderPage(orders[i]);
            }
            report.end();

            // todo - fix report name collisions
            let stream = fs.createWriteStream(path.resolve(__dirname, '../../../reports' + filename));
            stream.on('open', () => {
                console.log(`Filestream open.`);
                report.pipe(stream);
            });


            stream.on('finish', function(){
                console.log(`Report generation complete:`);
                return res(filename);
            });

            stream.on('error', err => {
                console.log(`Error generating report:`);
                console.log(err);
            });

        } else {
            return rej('No new orders were found to print.');
        }
    })

}

function printSummaryCover(orders){
    console.log(`Printing summary...`);
    report.fontSize(16);
    report.text('Production Report', L_MARGIN, 50);
    report.text(moment().format('MM-DD-YYYY'), L_MARGIN + 180, 50).moveDown();
    report.text('Summary', L_MARGIN).moveDown();
    printSizeCounts(orders);
    printNamedrops(orders);
}

function printSizeCounts(orders){
    report.fontSize(12);
    let counts = countSizes(orders);
    let pos = 120;
    let col = 0;
    let row = 0;
    for(let s in counts){
        report
            .text(SIZE_MAP[s],    L_MARGIN + (col*180),         pos)
            .text(counts[s],      L_MARGIN + (col*180) + 75,    pos);
        pos += 15;
        row++;
        if(row > 5){
            row = 0;
            pos -= (6 * 15);
            col = 1;
        }
    }
}

function countSizes(orders){
    let counts = {};
    Object.assign(counts, SIZE_BLANK);
    console.log(`counts init:`);
    console.log(counts);

    for(let o in orders){
        counts[orders[o].size] += 1;
    }

    console.log(`counts post:`);
    console.log(counts);

    return counts;
}

function printNamedrops(orders){
    console.log('Printing namedrops');
    let namedrops = [];

    // orders = TEST_NAMEDROPS.map(n => { return {namedrop: n} });

    for(let o in orders){
        if(!namedrops.includes(orders[o].namedrop)){
            console.log(`adding namedrop: ${orders[o].namedrop}`);
            namedrops.push(orders[o].namedrop);
        }
    }

    namedrops = namedrops.sort();

    console.log(`\n\n\nSorted namedrops:`);
    console.log(namedrops);

    let limit = 29;
    let startPos = 270;
    let pos = startPos;
    let col = 0;
    let row = 0;
    for(let n in namedrops){

        if(row > limit){
            col++;
            if(col === 2){
                limit = 39;
                startPos = 120;
                pos = startPos; // Line up with size counts
            }
            if(col % 3 === 0){
                col = 0;
                row = 0;
                report.addPage();
            }
            row = 0;
            pos = startPos;
        }

        report.text(namedrops[n],    L_MARGIN + (col*180),    pos);
        pos += 15;
        row++;

    }

    console.log(`Finished drawing namedrops`);
}

function printOrderPage(order) {
    report.addPage();
    report.image('./static/images/noblewear.jpg', L_MARGIN, 50, { width: 150 });

    report.fontSize(16);
    report.text('Name Drop',  L_MARGIN,       150)
        .text(order.namedrop, L_MARGIN + 120, 150);

    report.text('Shirt Size:',    L_MARGIN,       180)
        .text(SIZE_MAP[order.size], L_MARGIN + 120, 180);

    report.text('Code:',  L_MARGIN,       210)
        .text(order.code, L_MARGIN + 120, 210)
        .moveDown();

    report.fontSize(16);
    report.text('Shipping', L_MARGIN, 300).moveDown();

    report.fontSize(12);
    // address
    report.text(order.name).moveDown(.2);
    report.text(order.address[0]).moveDown(.2);
    report.text(order.address[1]).moveDown(1.3);

    // email + phone
    report.text(order.email).moveDown(.2);
    report.text(phone_(order.phone));
}

function phone_(p){
    if(p !== ''){
        return util.phone(p);
    } else {
        return '(no phone number provided)';
    }
}

module.exports = {
    generate: generateReport
};