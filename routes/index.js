var express = require('express');
var router = express.Router();
var publicacaoFunc = require('../models/publicacao');
var fs = require('fs');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  publicacaoFunc.find().then((publis) =>{
    res.render('index', {adaptavel: publis});
  });
});

router.get('/publi', function(req, res, next){
  if(req.cookies && req.cookies.nome){
    res.render('publicacao');
  }else{
    res.redirect('users/login');
  }
});

router.post('/busca', function(req, res, next){
  var busca = req.body.busca;
  console.log(busca);

  publicacaoFunc.findBySearch(busca).then((publis) =>{
    res.render('index', {adaptavel: publis});
  });
}); 

router.post('/publi', function(req, res, next){
  var login = req.cookies.login;
  var form = formidable.IncomingForm();

  form.parse(req, function(err, fields, files){
    var titulo = fields.titulo;
    
    publicacaoFunc.insert(login, titulo);
    var imaganterior = files.image.path;
    var imagnova = './public/images/'+titulo+'image.jpg';

    fs.rename(imaganterior, imagnova, function (err) {
      if (err) throw err;
      console.log('Imagem adicionada!');
    });
    console.log('OK');
    res.redirect('/')
  });
});

module.exports = router;
