const user  = require('mongodb').MongoClient;
const config = require('../config');
const conexao = user.connect(config);

var url = 'mongodb://projeto2:projeto2@ds050087.mlab.com:50087/projetoweb';

module.exports = class publicacaoFunc {
    static find() {
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publicacao').find().toArray();
            }).catch((err) => {throw err; });
    }

    static insert(nome, titulo) {
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                db.collection('publicacao').insertOne({'nome':nome, 'titulo':titulo});
            }).catch((err) => {throw err; });
    }

    static findBySearch(busca){
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publicacao').find({'titulo': { "$regex": busca, "$options": "i" }}).toArray();
            }).catch((err) => {throw err; });
    }
};