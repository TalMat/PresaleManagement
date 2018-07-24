let fs = require('fs');
let Pdf = require('pdfkit');
let util = require('../util');

let report;
const L_MARGIN = 50;
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
const TEST_NAMEDROPS = [
    'COOKIES R GREAT', 'SALLY', 'PIZZAFACE', 'RADDAD', 'DYLAN K',
    'I LOVE MY TROOP', 'TO THE MOON', 'TROOP 8558', 'TROOP 8558',
    'TROOP 48458', 'TROOP 8558', 'JILLIAN', 'SARAH', 'SPIDERWOMAN',
    'GIRLSCOUTS ROCK', 'BILLY JO', 'ABSOLUTE LONGEST NAME', 'DONNY',
    'TONS OF NAMES', '~~RAD LYFE!~~', 'MOAR NAMEZ', 'OUT OF IDEAS',
    'I LIKE DOGS', 'CATS ARE OKAY', 'CUSTOM NAMES', 'CUSTOM NAMES',
    'IT JUST CONTINUES', 'TESTING A LOT', 'JACKIE', 'BRITTANY', 'JVNNY',
    'COOL NAME DUDE', 'CHRIS', 'JAKE', 'JOE', 'I LOVE MY PARENTS', 'JESUS',
    'FAITH', 'INFINITY', 'COOKIES', 'RANDOM NAMES', 'RANDOM IDEAS',
    'SELL THEM COOKIES', 'JUST KEEP SWIMMING', 'PARTICIPATION AWARD',
    'CATS R DOGS', 'NAMEDROPPP', 'NAMEDROP', 'SARAH', 'NO DUPLICATES',
    'HERE IS A SHIRT', 'BE COOL KIDDO', 'TIME FOR COOKIES', 'GRLSCTZ',
    'AAAAAA', 'BBBBBBB', 'CCCCCC', 'DDD', 'DDDDD', 'CCCCCCCCCC', 'ZZZZZZZ',
    'XXXXXXXXX', 'YYYYY', '000', '9999999', '666666666', '88888', '77777',
    '5555555', '44444444', '3333333', '22222222', '1111111111', '000000',
    'DARREN', 'ZACHARY', 'GIRLNAMES', 'BOYZ R GIRLZ TOO', 'TEST WRAP',
    'BOBBY', 'SANDRA', 'SANDY', 'SANDALS', 'SANDFACE', 'SANDCOOKIES',
    'SANTANA', 'SANTARIA', 'CRYSTAL BALL', 'GOOD VIBES', 'SEBIV DOOG',
    'DOGGO LUVR'
];

function generateReport(filename, orders){

    return new Promise((res, rej) => {
        if(orders.length > 0){
            report = new Pdf;
            printSummaryCover(orders);

            // Presort to put pages in order
            orders.sort((a, b) => a.namedrop.localeCompare(b.namedrop));

            for(let i = 0; i < orders.length; i++){
                printOrderPage(orders[i]);
            }

            // todo - fix report name collisions
            let stream = fs.createWriteStream('./reports/' + filename);
            report.pipe(stream);

            report.end();

            stream.on('finish', function(){
                res(filename);
            });
        } else {
            rej('New orders were found.');
        }
    });

}

function printSummaryCover(orders){
    report.fontSize(16);
    report.text('Production Report', L_MARGIN, 50);
    report.text(util.date(), L_MARGIN + 180, 50).moveDown();
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
        if(row > 6){
            row = 0;
            pos -= (7 * 15);
            col = 1;
        }
    }
}

function countSizes(orders){
    let counts = {};
    Object.assign(counts, SIZE_BLANK);

    for(let o in orders){
        counts[orders[o].size] += 1;
    }

    return counts;
}

function printNamedrops(orders){
    let namedrops = [];

    // orders = TEST_NAMEDROPS.map(n => { return {namedrop: n} });

    for(let o in orders){
        if(!namedrops.includes(orders[o].namedrop)){
            namedrops.push(orders[o].namedrop);
        }
    }

    namedrops = namedrops.sort();

    let pos = 270;
    let col = 0;
    let row = 0;
    for(let n in namedrops){
        report.text(namedrops[n],    L_MARGIN + (col*180),    pos);
        pos += 15;
        row++;
        if(row > 29){
            row = 0;
            pos -= (30*15);
            col++;
            if(col === 2){
                pos -= 150; // Line up with size counts
            }
        }
    }
}

function printOrderPage(order) {
    report.addPage();
    report.image('./static/images/noblewear.jpg', L_MARGIN, 50, {width: 150});

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