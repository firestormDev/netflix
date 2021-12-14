var express = require('express');
var router = express.Router();

router.get('/login', function(req,res,next){
    res.render('/users/index', {});
});

router.post('/login', function(req,res,next){
    let login = req.body.login,
    password = req.body.password;
    if(login === 'user' && 'password' === 'pass'){
        res.cookie('login', 'user');
        res.redirect('/');
        return;
    }else{
        res.status(403);
        res.write('<h1> Login requerido </h1>');
        res.end();
    }

    res.redirect('/login');
})

module.exports = router;
