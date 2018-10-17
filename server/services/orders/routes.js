const { Crypt } = require('../EncryptionService');
let crypt = new Crypt(process.env.ENC_KEY);
let Order =         require('./model');
let Code =          require('../presales/model');
let reports =       require('../reporting/routes');
let email =         require('../EmailService');
let moment =        require('moment');
let dateFormat = 'MM.DD.YY h:mmA';

function decryptOrders(orders){
    return orders.map(o => {
        return o.decrypt();
    });
}

exports.getAll = (req, res) => {
    Order.find({ 'status': { $ne: 'invoiced' }})
        .then( docs => {
            if(docs) res.json({success: true, orders: decryptOrders(docs)});
        })
        .catch(err => {
            res.json({success: false, message: 'Retrieving orders from database failed.'});
            console.log(`Error: retrieving orders from database failed | ${moment().format(dateFormat)}`);
            console.log(err);
        })
};

exports.createOrder = (req, res) => {
    // runs when user submits a new order
    let code = req.body.code.toUpperCase();

    Code.findOneAndUpdate({ code: code }, { "available": false }, {upsert: false})
        .then(result => {

            if(!result){
                return Promise.reject({
                    appError: true,
                    message: 'Please enter a valid code'
                });
            }

            if(result && !result.available){
                return Promise.reject({
                    appError: true,
                    message: 'That code was already redeemed'
                });
            }
        })
        .then(() => {
            makeOrder(req);
            console.log(`Order created | Code: ${code} | Namedrop: ${req.body.namedrop} | Size: ${req.body.size} | ${moment().format(dateFormat)}`);
            email.sendConfirmationEmail(req.body.email);
            res.status(303);
            res.redirect('/order-success');
            // res.render('order-success', { name: name })
        })
        .catch(err => {
            if(err.appError) {
                res.render('order-page', {
                    codeError: err.message,
                    formClasses: 'was-validated'
                });
                console.log(`Error creating order: ${err.message} | Code: ${code} | Email: ${req.body.email} | ${moment().format(dateFormat)}`);
            } else {
                res.render('404', {
                    error: err
                });

                console.log(`Error creating order: application error | Code: ${code} | Email: ${req.body.email} | ${moment().format(dateFormat)}`);
                console.log(err);
            }
        })
};

exports.sinceDate = (req, res) => {

    let since = JSON.parse(req.body.date);

    if(!since){
        res.json({ success: false, message: 'Date required for sinceDate'});
    }

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
            console.log(`Error updating order status:`);
            console.log(err);
            res.json({ success: false, message: 'Problem updating orders'});
        })
};

exports.printNew = (async (req, res) => {

    try {

        let orders = await Order.find({status: "new"});
        let reportData = await reports.newProduction(decryptOrders(orders));
        await Order.updateMany(
            { status: 'new' },
            { $set: {
                status: 'printing',
                'history.printing': Date.now()
            }},
            {runValidators: true}
        );
        console.log(reportData);
        res.json({
            filename: reportData.filename,
            report: reportData.report,
            success: true
        });
    } catch(e) {
        console.log(`Error: ${e}`);
    }
});

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
    }).save();
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