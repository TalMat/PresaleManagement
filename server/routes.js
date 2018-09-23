let path =      require('path');
let passport =  require('passport');
let express =   require('express');
let router =    express.Router();

// todo - separate login portal routes from customer order routes

// JS HTML template
let order_page = require('./views/order-page');

router.post('/login', passport.authenticate('local-login'), function(req, res) {
    redirectByRole(req, res)
});

router.get('/', auth, function(req, res){
    redirectByRole(req, res);
});

function redirectByRole(req, res){
    if(req.user) {
        console.log(req.user.local.username + ' role: ' + req.user.local.role);
        (req.user.local.role === 'manager' || 'admin') ? res.redirect('/management/portal')
            : (req.use.local.role === 'customercare') ? res.redirect('/customercare/portal')
            : sendHTML(res, 'login-page');
    }
}


router.get('/management/portal', function(req, res){
    (req.user.local.role === 'manager' || 'admin')
        ? sendHTML(res, 'mgmt_index')
        : sendHTML(res, 'login-page');
});

router.get('/customer-care/portal', function(req, res){
    (req.user.local.role === 'customercare' || 'admin')
        ? sendHTML(res, 'cc_index')
        : sendHTML(res, 'login-page');
});

router.get('/logout', (req, res) => {
    console.log('Logging out...');
    req.logout();
    res.redirect('/');
});

router.get('/girlscouts', (req, res) => {
    res.send(order_page({ codeError: 'Redemption code is required', showValidation: false }))
});

router.get('/reports/:file', auth, (req, res) => {
    console.log(req.params.file);
    let filepath = __dirname + '/reports/' + req.params.file;
    console.log(filepath);
    res.download(filepath);
});

function sendHTML(res, filename){
    res.sendFile(path.join(__dirname + '/static/' + filename + '.html'));
}

function auth(req, res, next){
    req.isAuthenticated()
        ? next()
        : sendHTML(res, 'login-page');
}

module.exports = router;
