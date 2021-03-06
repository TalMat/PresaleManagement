let path =      require('path');
let passport =  require('passport');
let express =   require('express');
let router =    express.Router();
let moment =    require('moment');
let dateFormat = 'MM.DD.YY h:mmA';


router.post('/login',
    passport.authenticate('local-login', {
        successRedirect: '/portal',
        failureRedirect: '/'
    })
);

router.get('/', isUser, function(req, res){
    redirectByRole(req, res);
});


router.get('/portal', (req, res) => redirectByRole(req, res));

router.get('/management/portal', isUser, function(req, res){

    (req.user.local.role === 'manager' || 'admin') ?
        res.render('mgmt-index')
        : res.render('login-page');
});

router.get('/customer-care/portal', isUser, function(req, res){

    (req.user.local.role === 'customercare' || 'admin') ?
        res.render('cc-index')
        : res.render('login-page');
});

router.get('/logout', (req, res) => {
    console.log(`${req.user.local.username} logged out | ${moment().format(dateFormat)}`);
    req.logout();
    res.redirect('/');
});

function isUser(req, res, next){

    (req.user && req.isAuthenticated()) ?
        next()
        : res.render('login-page');
}

function redirectByRole(req, res){

    let role = req.user.local.role;
    console.log(`${req.user.local.username} logged in | Role: ${role} | ${moment().format(dateFormat)}`);

    (role === 'manager' || role === 'admin') ?
        res.redirect('/management/portal')
        : (role === 'customercare') ?
        res.redirect('/customer-care/portal')
        : res.redirect('/');
}

module.exports = router;
