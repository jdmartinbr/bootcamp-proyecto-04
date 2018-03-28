let connection = require('../connection/mysqlconnection');
let users = {};

users.fetchAll = function(cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  const SQL = 'SELECT * FROM users;';
  connection.query(SQL, function(err, rows){
     if (err) return cb(err);
     else return cb(null, rows);
  });
};

users.insertOne = function(user, cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('INSERT INTO users SET ?', [user], function(err, res){
     if (err) return cb(err);
     return cb(null, res);
  });
};

users.register = function (user, cb) {
    let controlador = [1,2,3];
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('SELECT * FROM users WHERE usuario=?',user.usuario, function(err1, res1) {
      if (err1) return cb(err1);
      if(res1 != "") {
          return cb(null, controlador[0])
        } else {
          connection.query('SELECT * FROM users WHERE email=?', user.email, function (err2, res2) {
              if (err2) return cb(err2);
              if (res2 != "") {

                  return cb(null, controlador[1])
              } else {
                  connection.query('INSERT INTO users SET ?', user, function (err, result) {
                      if (err) return cb(err);
                      if (result != "") {

                          return cb(null, controlador[2])
                      }
                  });
              }
          });
      }
    });
};

users.login = function (user, cb) {
  let controlador = [1,2,3];
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('SELECT * FROM users WHERE usuario=?', user.usuario_login, function(err1, res1) {
      if (err1) return cb(err1);
      if(res1 == "") {
          return cb(null, controlador[0])
        } else {
          connection.query('SELECT * FROM users WHERE password=?', user.password_login, function (err2, res2) {
              if (err2) return cb(err2);
              if (res2 == "") {
                  return cb(null, controlador[1])
              } else {
                  return cb(null, controlador[2])
              }
          });
      }
  });
};

users.getDestinos = function (cb) {
  if(!connection) return cb('No se ha podido crear la conexion');
  connection.query('SELECT * FROM destinos', function(err, res) {
      if (err) return cb(err);
      if(res){
          return cb(null, res)
      }
  });
};

module.exports = users;
