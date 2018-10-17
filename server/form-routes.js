let express = require('express');
let router = express.Router();

router.get('/girlscouts', (req, res) => {
    res.render('order-page', {
        codeError: 'Redemption code is required',
        showValidation: false,
        formClasses: ''
    })
});

router.get('/order-success', (req, res) => {
    res.render('order-success');
});

module.exports = router;