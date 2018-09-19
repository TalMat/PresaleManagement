let path =      require('path');
let passport =  require('passport');
let express =   require('express');
let router =    express.Router();

// JS HTML template
let order_page = require('./views/order-page');

router.post('/login',
    passport.authenticate('local-login', {
        successRedirect: '/portal',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/login', (req, res) => {
    sendHTML(res, 'login-page');
});

router.get('/', auth, (req, res) => {
    res.redirect('/portal');
});

router.get('/portal', auth, function(req, res){
    console.log('Sending SPA to client...');
    sendHTML(res, 'cc_index');
});

router.get('/logout', (req, res) => {
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
    if(req.isAuthenticated()){
        console.log('User is logged in');
        next();
    } else {
        console.log('User is NOT logged in');
        res.redirect('/login');
    }
}

module.exports = router;
