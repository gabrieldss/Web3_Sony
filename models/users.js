const user  = require('mongodb').MongoClient;
const config = require('../config');
const conexao = user.connect(config);

var url = 'mongodb://projeto2:projeto2@ds050087.mlab.com:50087/projetoweb';

module.exports = class userFunc {
    static find() {
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('users').find().sort({nome: 1}).toArray();
            }).catch((err) => {throw err; });
    }

    static insert(nome, senha, email) {
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                db.collection('users').insertOne({'nome':nome, 'senha':senha, 'email':email });
            }).catch((err) => {throw err; });
    }

    static findByLogin(nome){
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('users').find({'nome':nome}).toArray();
            }).catch((err) => {throw err; });
    }

    static findByEmail(email){
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('users').find({'email':email}).toArray();
            }).catch((err) => {throw err; });
    }
};