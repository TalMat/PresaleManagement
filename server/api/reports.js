let Report =            require('../models/report');
let Inventory =         require('../models/inventory');
let util =              require('../util');
let productionReport =  require('../report_utilities/production-report');
let shippingReport =    require('../report_utilities/shipping-report');
let invoiceReport =     require('../report_utilities/invoice-report');
let fs =                require('fs');
let path =              require('path');


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
    let createFile = productionReport.generate(filename, orders);

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
        console.log('inventory update, report generation, and report db write complete...');
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
        console.log('report generation, and report db write complete...');
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
                    // todo - regenerate file if !exists in /reports
                    console.log('error: ' + err);
                    res.json({ success: false, message: err })
                } else {
                    res.json({ success: true, filename: filename })
                }
            });
        });
};

exports.file = (req, res) => {

    let filepath = path.join(__dirname, '../reports/', req.params.file);
    console.log('GET /api/reports/' + req.params.file + ' called...');
    res.download(filepath);
};

function describe(o){
    let first = o.reduce((a, b) => (a.namedrop < b.namedrop) ? a : b );
    let last = o.reduce((a, b) => (a.namedrop > b.namedrop) ? a : b );
    return o.length + ' orders | ' + first.namedrop + ' ... ' + last.namedrop;
    // Example:     31 orders | ANNA RULES ... ZIA FO FIA
}
