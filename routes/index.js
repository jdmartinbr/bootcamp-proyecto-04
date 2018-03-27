let express = require('express');
let router = express.Router();
let destinos = require('../public/data/destinos.js');

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'travel_agency'
});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main.hbs', {
      title: 'Geekshubs Travell',
      layout: 'template',
      destinos: destinos
      // destinos: [
      //     {
      //         "city": "París",
      //         "country": "Francia",
      //         "description": "Escapada romántica.",
      //         "type": "Romántico",
      //         "price": 250,
      //         "image": "../images/paris.jpg",
      //         "active": true
      //     },
      //     {
      //         "city": "Washington",
      //         "country": "EE.UU.",
      //         "description": "Disfruta de un país increible.",
      //         "type": "Histórico",
      //         "price": 1150,
      //         "image": "../images/washignton.jpg",
      //         "active": false
      //     },
      //     {
      //         "city": "Waterford",
      //         "country": "Irlanda",
      //         "description": "Unas vistas inolvidables.",
      //         "type": "Naturaleza",
      //         "price": 450,
      //         "image": "../images/irlanda.jpg",
      //         "active": false
      //     },
      //     {
      //         "city": "Pekín",
      //         "country": "China",
      //         "description": "Un destino milenario.",
      //         "type": "Aventurero",
      //         "price": 1650,
      //         "image": "../images/pekin.jpg",
      //         "active": false
      //     },
      //     {
      //         "city": "Agra",
      //         "country": "India",
      //         "description": "Descubre una nueva cultura.",
      //         "type": "Rincones insólitos",
      //         "price": 500,
      //         "image": "../images/india.jpg",
      //         "active": false
      //     },
      //     {
      //         "city": "Cartagena",
      //         "country": "Colombia",
      //         "description": "Un lugar con mucho color.",
      //         "type": "Histórico",
      //         "price": 650,
      //         "image": "../images/cartagena.jpg",
      //         "active": false
      //     }
      // ]
  })
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

router.get('*', function(req, res, next) {
  res.render('404.hbs', {
        title: 'Error',
        layout: 'template'
  })
});

router.post('/registerok', function(req, res){
    let user = {
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password_sec
    };
    connection.query('SELECT * FROM users WHERE usuario=?',user.usuario, function(err1, res1) {
       if(res1 != "") {
           //res.send('El nombre de usuario ya existe');
           res.render('registro', {
               layout: 'template',
               errorUsuario: true});
       } else {
           connection.query('SELECT * FROM users WHERE email=?',user.email, function(err2, res2) {
               if (res2 != "") {
                   //res.send('El correo electronico ya existe');
                   res.render('registro', {
                       layout: 'template',
                       errorEmail: true});
               } else {
                    connection.query('INSERT INTO users SET ?',user, function(err, result) {
                        if(err) {
                            console.log(err);
                        } else {
                            res.render('login', {
                                layout: 'template',
                                register: true
                            });
                        }
                    });
               }
           });
       }
    });


});

module.exports = router;
