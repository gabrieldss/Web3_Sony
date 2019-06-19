var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose  = require('mongodb').MongoClient;
var app = express();

//Carregando as rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Cria o arquivo usuarios.db
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('usuarios.db');


app.get('/users/usuarios', (req, res) => {

// Seleção de todos usuários do banco
  db.all('SELECT * FROM users_to_usuarios', (err, rows) => {
    const nomes = rows.map(e => e.nome);
    res.send(nomes);
  });  
});

app.get('/users/usuarios/:nome', (req, res) => {
  const varr = req.params.nome;
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/users/usuarios', (req, res) => {

// Inserindo usuário e exibindo mensagem de sucesso ou erro
  db.run(
    'INSERT INTO users_to_usuarios VALUES ($nome, $email)',
    {
      $nome: req.body.nome,
      $email: req.body.email
    }, 
    (err) => {
      if (err) {
        res.send({message: 'Erro em app.post(/users/usuarios'});
      } else {
        res.send({message: 'Sucesso em app.post(/users/usuarios'});
      }
    }
  );
});


// Connecta ao banco
mongoose.connect('mongodb://localhost:27017/test',  { useNewUrlParser: true });
mongoose.connect('mongodb://projeto2:projeto2@ds050087.mlab.com:50087/projetoweb',  { useNewUrlParser: true });

// Tipo de templete usado
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Tipos de requisições possiveis
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Exportar algo dessa classe
module.exports = app;
