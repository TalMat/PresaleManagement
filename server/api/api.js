let orders =    require('./orders');
let codes =     require('./presales');
let inventory = require('./inventory');
let reports =   require('./reports');
let express =   require('express');
let api =       express.Router();

// todo - name consistently

/*____ orders ____*/
api.get('/orders',                  auth, orders.getAll);
api.post('/orders',                 auth, orders.sinceDate);
api.post('/orders/status',          auth, orders.updateStatus);
api.post('/orders/print-new',       auth, orders.printNew);
api.post('/orders/ship-printed',    auth, orders.shipPrinted);
api.post('/orders/invoice-shipped', auth, orders.invoiceShipped);
api.post('/order',                        orders.createOrder);


/*____ inventory ____*/
api.get('/inventory',               auth, inventory.getAll);
api.post('/inventory/new-item',     auth, inventory.newItem);
api.post('/inventory/delete-item',  auth, inventory.deleteItem);


/*____ presale ____*/
api.get('/presales',                auth, codes.getAll);
api.post('/code',                   auth, codes.check);
api.post('/generate',               auth, codes.generate);


/*____ reports ____*/
api.get('/reports',                 auth, reports.getAll);
api.post('/report/download',        auth, reports.download);


function auth(req, res, next){
    if(req.isAuthenticated()){
        console.log('User is logged in');
        next();
    } else {
        console.log('User is NOT logged in');
        res.redirect('/login');
    }
}


module.exports = api;
