let Report =            require('./model');
let Inventory =         require('../inventory/model');
let productionReport =  require('./generators/production-report');
let shippingReport =    require('./generators/shipping-report');
let invoiceReport =     require('./generators/invoice-report');
let fs =                require('fs');
let path =              require('path');
let mongoose =          require('mongoose');
let moment =            require('moment');

let MONGO_URL = process.env.MONGO_URL;

let dateFormat = 'MM.DD.YY h:mmA';
let filenameFormat = 'YYYY-MM-DD';

let contentTypes = {
    pdf: 'application/pdf',
    csv: 'text/csv'
};

let Grid = require('gridfs-stream');
let GridFS;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB using Mongoose. (reporting/routes)');
        GridFS = Grid(mongoose.connection.db, mongoose.mongo);
    })
    .catch(err => {
        console.log('Error connecting to MongoDB using Mongoose... (reporting/routes)');
        console.log(err);
    });

function makeReportMetadata(orders, filename, kind){
    return {
        kind: kind,
        filename: filename,
        description: describe(orders),
        order_codes: orders.map(o => o.code),
        date: Date.now() // Date is returned client for sorting
    };
}

function saveReportFile(orders, filename, reportKind){

    let metadata = makeReportMetadata(orders, filename, reportKind);

    let writeStream = GridFS.createWriteStream({
        filename: filename.split('.')[0],
        metadata: metadata
    });

    writeStream.on('close', file => {
        // todo - remove file from local storage
        return Promise.resolve(metadata);
    });

    writeStream.on('error', err => {
        return Promise.reject(err);
    });

    fs.createReadStream(path.join(__dirname, '../../reports', filename))
        .pipe(writeStream);
}

function getMapOfCounts(orders){
    return orders.reduce(function(res, o){
        (res[o.size] !== undefined) // size is in map
            ? res[o.size]++         // count size or
            : res[o.size] = 1;      // initialize size
        return res;
    }, {});
}

exports.getAll = (req, res) => {

    GridFS.files.find().toArray()
        .then(data => {
            res.json({
                success: true,
                data: data.map(data => data.metadata)
            });
        })
        .catch(err => res.json({ sucess: false, message: err }))
};

exports.newProduction = (orders) => {
    let filename = `production_${moment().format(filenameFormat)}.pdf`;

    let metadata = productionReport.generate(filename, orders)
        .then(filename => saveReportFile(orders, filename, 'production'));

    let counts = getMapOfCounts(orders);

    let inventoryUpdate = Inventory.create({
        kind: 'production',
        description: 'Automated production inventory',
        counts
    });

    return Promise.all([metadata, inventoryUpdate]).then((reportData) => {
        return {
            filename: filename,
            report: metadata
        }
    });
};

exports.newShipment = (orders) => {
    let filename = `shipping_${moment().format(filenameFormat)}.csv`;

    return shippingReport.generate(filename, orders)
        .then(filename => saveReportFile(orders, filename, 'shipping'))
        .then(metadata => {
            return {
                filename: filename,
                report: metadata
            }
        });
};

exports.newInvoice = (orders) => {
    let filename = `invoice_${moment().format(filenameFormat)}.pdf`;

    return invoiceReport.generate(filename, orders)
        .then(filename => saveReportFile(orders, filename, 'invoice'))
        .then(metadata => {
            return {
                filename: filename,
                report: metadata
            }
        });
};

exports.download = (req, res) => {

    let [filename, extention] = req.body.filename.split('.');

    GridFS.files.find({filename: filename}).toArray()
        .then(data => {
            if(!data[0]) return Promise.reject(`File ${filename} does not exist`);
            res.writeHead(200, {
                'Content-Type': contentTypes[extention],
                'Content-Length': data[0].length
            });
            let readStream = GridFS.createReadStream({filename: filename});
            readStream.pipe(res);
        })
        .catch(err => {
            res.render('404', {error: err });
            console.log(`${err} | User: ${req.user.local.username} | ${moment().format(dateFormat)}`);
        });

};

exports.file = (req, res) => {

    let [filename, extention] = req.params.file.split('.');

    GridFS.files.find({filename: filename}).toArray()
        .then(data => {
            if(!data[0]) return Promise.reject(`File ${filename} does not exist`);
            res.writeHead(200, {
                'Content-Type': contentTypes[extention],
                'Content-Length': data[0].length
            });
            let readStream = GridFS.createReadStream({filename: filename});
            readStream.pipe(res);
        })
        .catch(err => {
            res.render('404', {error: err });
            console.log(`${err} | User: ${req.user.local.username} | ${moment().format(dateFormat)}`);
        });
};

function describe(o){
    let first = o.reduce((a, b) => (a.namedrop < b.namedrop) ? a : b );
    let last = o.reduce((a, b) => (a.namedrop > b.namedrop) ? a : b );
    return o.length + ' orders | ' + first.namedrop + ' ... ' + last.namedrop;
    // Example:     31 orders | ANNA RULES ... ZIA FO FIA
}
