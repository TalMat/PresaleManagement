let path =      require('path');
let passport =  require('passport');
let express =   require('express');
let router =    express.Router();


router.post('/login', passport.authenticate('local-login'), function(req, res) {
    redirectByRole(req, res)
});

router.get('/', isUser, function(req, res){
    console.log('/ called...');
    redirectByRole(req, res);
});

function redirectByRole(req, res){

    let role = req.user.local.role;
    console.log(req.user.local.username + ' logged in | Role: ' + role);

    (role === 'manager' || role === 'admin') ?
        res.redirect('/management/portal')
        : (role === 'customercare') ?
        res.redirect('/customer-care/portal')
        : sendHTML(res, 'login-page');
}


router.get('/management/portal', isUser, function(req, res){

    (req.user.local.role === 'manager' || 'admin') ?
        sendHTML(res, 'mgmt_index')
        : sendHTML(res, 'login-page');
});

router.get('/customer-care/portal', isUser, function(req, res){

    (req.user.local.role === 'customercare' || 'admin') ?
        sendHTML(res, 'cc_index')
        : sendHTML(res, 'login-page');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// router.get('/reports/:file', auth, (req, res) => {
//     let filepath = __dirname + '/reports/' + req.params.file;
//     res.download(filepath);
// });

function sendHTML(res, filename){
    res.sendFile(path.join(__dirname + '/static/' + filename + '.html'));
}

function isUser(req, res, next){

    (req.user && req.isAuthenticated()) ?
        next()
        : sendHTML(res, 'login-page');
}

module.exports = router;
