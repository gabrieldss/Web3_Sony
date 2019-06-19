var express = require('express');
var router = express.Router();
var userFunc = require('../models/users');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/buscarUsuarios', function(req, res, next) {
  res.render('buscarUsuarios');
});

router.get('/buscarEmpresas', function(req, res, next) {
  res.render('buscarEmpresas');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res, next){
  if(req.cookies && req.cookies.nome){
    res.clearCookie('nome', {path:'/'});
  }
  res.redirect('/');
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});


router.post('/cadastro', function(req, res, next){
  var nome = req.body.nome;
  var senha = req.body.senha;
  var email = req.body.email;
  if(!nome || !senha || !email){
    res.send('Todos os campos devem ser preenchidos')
    res.end();
    return;
  } else {
    if (nome.length < 3) {
      res.send('O nome deve conter pelo menos 3 caracteres');
      res.end();
      return;
    }
    else {
      if (email.length < 3) {
        res.send('O email deve conter pelo menos 3 caracteres');
        res.end();
        return;
      } else {
        if (senha.length < 6) {
          res.send('A senha deve conter pelo menos 6 caracteres');
          res.end();
          return;
        } else {
          var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
          if (!reg.test(email)) {
            res.send('Email inválido!');
          }
          else {
            userFunc.findByLogin(nome).then((user) =>{
              if(user[0]){
                res.send('Esse usuário já esta cadastrado no sistema!');
                res.redirect('/users/cadastro');
                res.end();
                return;
              }
              userFunc.findByEmail(email).then((user)=>{
                if(user[0]){
                  res.send('Esse email já esta cadastrado no sistema!');
                  res.end();
                  return 0;
                }else{
                  return 1;
                }
              }).then((v)=>{
                if(v===1){
                  userFunc.insert(nome, senha, email);
                  res.redirect('/');
                }
              });
            });
          }          
        }
      }
    }
  }

});

router.post('/login', function(req, res, next){
  var nome = req.body.nome;
  var senha = req.body.senha;

  if(!nome || !senha){
    res.send('Todos os campos devem ser preenchidos!')
    res.end();
    return;
  }

  userFunc.findByLogin(nome).then((user) => {
    if(user[0]) {
      if(user[0].senha === senha) {
        res.cookie('nome', nome)
        res.redirect('/');
      } else {
        res.status(403);
        res.send('Senha inválida!');
        res.end();
      }
    } else {
      res.status(403);
      res.send('Login inválido!');
      res.end();
    }
  });
});

module.exports = router;
