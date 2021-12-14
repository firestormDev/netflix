
var express = require('express');
var router = express.Router();
//local url protegida
router.get('/', function(req,res,next){
    if(req.cookies && req.cookies.login) {
        res.render('index', {
            title: 'DASHBOARD',
            user: req.cookies.login
        });
        return ;
    }

    res.redirect('/login');
})

module.exports = router;
