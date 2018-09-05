const { Crypt } = require('../services/EncryptionService');
let crypt = new Crypt(process.env.ENC_KEY);

let Order =         require('../models/order');
let Code =          require('../models/code');
let reports =       require('./reports');

let email =         require('../services/EmailService');

// JS HTML templates
let order_page =    require('../views/order-page');
let order_success = require('../views/order-success');


function decryptOrders(orders){
    return orders.map(o => {
        return o.decrypt();
    });
}

exports.getAll = (req, res) => {
    console.log('GET /api/orders called...');
    Order.find({ 'status': { $ne: 'invoiced' }})
        .then( docs => {
            if(docs){

                res.json(decryptOrders(docs));
            } else {
                res.status(500);
                res.send('Error: Could not retrieve documents...');
            }
        })
        .catch(err => {
            console.log(err);
        })
};

exports.createOrder = (req, res) => {
    console.log('Attempting to create new order');
    let code = req.body.code;
    let name = req.body.name.split(' ')[0];

    // Check database for submitted code
    Code.find({ code })
        .then(result => {

            if(!result[0]){
                res.send(
                    order_page({
                        codeError: 'That code is not valid',
                        showValidation: true
                    }))

            } else if(result[0].available){
                return result[0];

            } else if(result) {
                res.send(
                    order_page({
                        codeError: 'That code has already been redeemed',
                        showValidation: true
                    }));
            }
        })
        .then(code => {
            code.set({available: false});
            code.save( (err, updated) => {
                if(err){
                    res.json({ success: false, message: err });
                }
            });

            return makeOrder(req).save();
        })
        .then(result => {
            console.log(result);
            email.sendConfirmationEmail(req.body.email);
            res.send(order_success({ name }));
        })
        .catch(err => {
            console.log('Error: ' + err);
        })
};

exports.sinceDate = (req, res) => {

    let since = JSON.parse(req.body.date);

    if(!since){
        res.json({ success: false, message: 'Date required for sinceDate'});
    }

    console.log(since);
    Order.find( { date: { $gte: since } } )
        .then(orders => {
            res.send(decryptOrders(orders));
        })
        .catch(err => {
            res.send(err);
        });
};

exports.updateStatus = (req, res) => {
    let status = req.body.status;
    let orders = JSON.parse(req.body.orders);

    Order.updateMany(
        { code: { $in : orders} },
        { $set: { status : status } },
        { runValidators: true } )
        .then(result => {
            res.json({ success: true, message: result.n + ' order(s) updated'});
        })
        .catch(err => {
            console.log(err);
            res.json({ success: false, message: 'Problem updating orders'});
        })
};

exports.printNew = (req, res) => {
    let orders;

    Order.find({ status:  'new' })
        .then(results => {
            orders = results;
        })
        .then(() => {
            return Order.updateMany(
                { status: 'new' },
                { $set: {
                    status: 'printing',
                    'history.printing': Date.now()
                }},
                {runValidators: true})
        })
        .then(() => {
            return reports.newProduction(decryptOrders(orders));
        })
        .then(result => {
            res.json({
                filename: result.filename,
                report: result.report,
                success: true
            });
        })
        .catch( err => {
            res.json({
                success: false,
                message: err
            })
        });
};

exports.shipPrinted = (req, res) => {
    let orders;

    Order.find({ status: 'printing' })
        .then(results => {
            orders = results;
            orders.forEach(o => {
                email.sendShippedEmail(o.email);
            })
        })
        .then(() => {
            return Order.updateMany(
                { status: 'printing' },
                { $set: {
                    status: 'shipped',
                    'history.shipped': Date.now()
                }},
                {runValidators: true})
        })
        .then(result => {
            console.log(result);
            return reports.newShipment(decryptOrders(orders));
        })
        .then(result => {
            res.json({
                success: true,
                filename: result.filename,
                report: result.report
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: err
            })
        });
};

exports.invoiceShipped = (req, res) => {
    let orders;

    Order.find({ status: 'shipped' })
        .then(results => {
            orders = results;
        })
        .then(() => {
            return Order.updateMany(
                { status: 'shipped' },
                { $set: {
                    status: 'invoiced',
                    'history.invoiced': Date.now()
                }},
                {runValidators: true})
        })
        .then(() => {
            return reports.newInvoice(decryptOrders(orders));
        })
        .then(result => {
            res.json({
                success: true,
                filename: result.filename,
                report: result.report
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: err
            })
        });
};

function makeOrder(req){
    return new Order({
        code: req.body.code,
        namedrop: req.body.namedrop.toUpperCase(),
        size: req.body.size,
        name: req.body.name,
        email: req.body.email,
        address: concatAddress(
            req.body.address_1, req.body.address_2,
            req.body.city, req.body.state, req.body.zip ),
        phone: req.body.phone
    });
}

function concatAddress(address_1, address_2, city, state, zip){
    let address = [];

    address[0] = address_1;
    if(address_2.length > 0){
        address[0] = address[0] + ', ' + address_2;
    }

    address[1] = city + ', ' + state + ' ' + zip;

    return address;
}