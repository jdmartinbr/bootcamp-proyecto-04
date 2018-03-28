let express = require('express');
let router = express.Router();
let usersModel = require('../models/usersModels');
//let destinos = require('../public/data/destinos.js');

router.get('/', function(req, res, next) {
    let destinos = [];
    usersModel.getDestinos(function (err, dest) {
       if (err) return res.status(500).json(err);
       destinos = dest;
       console.log(dest);
          res.render('main.hbs', {
              title: 'Geekshubs Travell',
              layout: 'template',
              destinos: destinos
          })
    });
});

router.get('/login', function(req, res, next) {
  res.render('login.hbs', {
        title: 'Login',
        layout: 'template'
  })
});

router.get('/registro', function(req, res, next) {
  res.render('registro.hbs', {
        title: 'Registro',
        layout: 'template',
  })
});

router.post('/registerok', function(req, res){
    let user = {
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password_sec
    };
    usersModel.register(user, function (err, data) {
        if (err) return res.status(500).json(err);
        switch (data){
            case 1:
                res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorUsuario:true
                });
                break;
            case 2:
                res.render('registro', {
                    title: 'Registro',
                    layout: 'template',
                    errorEmail:true
                });
                break;
            case 3:
                res.render('login', {
                    title: 'Registro',
                    layout: 'template',
                    register: true
                });
                break;

        }
    });
});

router.post('/loginok', function (req, res) {
    let user = {
        usuario_login: req.body.usuario_login,
        password_login: req.body.password_login
    };
    usersModel.login(user, function (err, data) {
        if (err) return res.status(500).json(err);
        switch (data){
            case 1:
                res.render('login', {
                    title: 'Login',
                    layout: 'template',
                    errorUsuario:true
                });
                break;
            case 2:
                res.render('login', {
                    title: 'login',
                    layout: 'template',
                    errorPassword:true
                });
                break;
            case 3:
                res.render('main', {
                    title: 'Geekshubs Travell',
                    layout: 'template',
                    logged: true,
                    destinos: destinos,
                    user
                });
                break;
        }
    });
});

router.get('*', function(req, res, next) {
  res.render('404.hbs', {
        title: 'Error',
        layout: 'template'
  })
});

module.exports = router;
