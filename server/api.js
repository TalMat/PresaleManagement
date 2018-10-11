let orders =    require('./services/orders/routes');
let codes =     require('./services/presales/routes');
let inventory = require('./services/inventory/routes');
let reports =   require('./services/reporting/routes');
let express =   require('express');
let api =       express.Router();
let passport =  require('passport');

let USER_CREATE_AUTH = process.env.USER_CREATE_AUTH;

let User =      require('./models/user');

/*____ orders ____*/
api.get('/orders',                  auth, orders.getAll);
api.post('/orders',                 auth, orders.sinceDate);
api.post('/orders/status',          auth, requireMgmt, orders.updateStatus);
api.post('/orders/print-new',       auth, requireMgmt, orders.printNew);
api.post('/orders/ship-printed',    auth, requireMgmt, orders.shipPrinted);
api.post('/orders/invoice-shipped', auth, requireMgmt, orders.invoiceShipped);
api.post('/order',                                     orders.createOrder);


/*____ inventory ____*/
api.get('/inventory',               auth, requireMgmt, inventory.getAll);
api.post('/inventory/new-item',     auth, requireMgmt, inventory.newItem);
api.post('/inventory/delete-item',  auth, requireMgmt, inventory.deleteItem);


/*____ presale ____*/
api.get('/presales',                auth, requireMgmt, codes.getAll);
api.post('/code',                   auth, requireMgmt, codes.check);
api.post('/generate',               auth, requireMgmt, codes.generate);

// todo - remove unused routes


/*____ reports ____*/
api.get('/reports',                 auth, requireMgmt, reports.getAll);
api.post('/report/download',        auth, requireMgmt, reports.download);
api.get('/reports/:file',           auth, requireMgmt, reports.file);


/*____ user ____*/
api.post('/user', userCreateAuth, passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));



function auth(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        console.log(`Unauthorized: Redirecting user from ${req.originalUrl} to /login`);
        res.redirect('/');
    }
}

function requireMgmt(req, res, next){
    if(req.user){

        let role = req.user.local.role;

        (role === 'manager' || role === 'admin')
            ? next()
            : res.redirect('/');
    }
}

function userCreateAuth(req, res, next){
    req.body.userCreateAuth === process.env.USER_CREATE_AUTH
        ? next()
        : res.redirect('/');
}

module.exports = api;
