let fs = require('fs');
let Pdf = require('pdfkit');
let util = require('../util');

const   L_MARGIN = 50,     X_LIGHT = '#ddd',    LIGHT = '#bbb',
        MEDIUM = '#777',    DARK = '#000';

let     report,             line_location,      line_num,
        page_num = 1;

const SIZE_BLANK = {
    'y-xs': 0,      'y-s': 0,       'y-m': 0,       'y-l': 0,
    'y-xl': 0,      'a-s': 0,       'a-m': 0,       'a-l': 0,
    'a-xl': 0,      'a-2xl': 0,     'a-3xl': 0,     'a-4xl': 0,
    'a-5xl': 0
};
const SIZE_MAP = {
    'y-xs': 'Youth XS',     'y-s': 'Youth S',       'y-m': 'Youth M',
    'y-l': 'Youth L',       'y-xl': 'Youth XL',     'a-s': 'Adult S',
    'a-m': 'Adult M',       'a-l': 'Adult L',       'a-xl': 'Adult XL',
    'a-2xl': 'Adult 2XL',   'a-3xl': 'Adult 3XL',   'a-4xl': 'Adult 4XL',
    'a-5xl': 'Adult 5XL'
};

function addPageNum(){
    report.fontSize(12);
    report.fillColor(LIGHT);
    report.text('Page ' + page_num, 500, 50);
    page_num++;
    report.fillColor(DARK);
}

function addInvoiceHeading(){
    report.fontSize(24);
    report.text('INVOICE', L_MARGIN, 50);
    report.fontSize(16);
    report.text(util.date(), L_MARGIN, 80);
    report.fontSize(12);
}

function printSizeCounts(orders){
    report.fontSize(8);
    let counts = countSizes(orders);
    let pos = 50;
    let col = 0;
    let row = 0;
    for(let s in counts){
        report.fillColor(fillNotZero(counts[s]));
        report
            .text(SIZE_MAP[s],                  230 + (col*90),         pos)
            .text(printNotZero(counts[s]),      230 + (col*90) + 40,    pos);
        pos += 10;
        row++;
        if(row > 4){
            row = 0;
            pos -= (5 * 10);
            col++;
        }
    }

    report.fontSize(12);
    report.fillColor(DARK);
}

function printNotZero(num){
    return (num == 0) ? '' : num;
}

function fillNotZero(num){
    return (num == 0) ? LIGHT : MEDIUM;
}

function countSizes(orders){
    let counts = {};
    Object.assign(counts, SIZE_BLANK);

    for(let o in orders){
        counts[orders[o].size] += 1;
    }

    return counts;
}

function generateReport(filename, orders){

    return new Promise((res, rej) => {
        report = new Pdf;
        addPageNum();
        addInvoiceHeading();
        printSizeCounts(orders);

        line_location = 120;
        line_num = 0;

        orders.forEach(o => {

            if(line_num >= 30){
                report.addPage();
                addPageNum();
                addInvoiceHeading();
                line_location = 120;
                line_num = 0;
            }

            // Shade every other line
            if(line_num % 2 === 0){
                report
                    .lineJoin('square')
                    .rect(L_MARGIN, line_location - 6, 520, 20)
                    .fillColor(X_LIGHT)
                    .fill();
            }

            report.fillColor(DARK);

            report.text(o.namedrop, L_MARGIN + 3, line_location);
            report.text(SIZE_MAP[o.size], L_MARGIN + 180, line_location);
            report.text(o.code, L_MARGIN + 400, line_location);
            line_location += 20;
            line_num++;
        });

        let stream = fs.createWriteStream('./reports/' + filename + '.pdf');
        report.pipe(stream);

        report.end();

        stream.on('finish', function () {
            res(filename);
        });
    });
}

module.exports = {
    generate: generateReport
};