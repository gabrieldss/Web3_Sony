const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('usuarios.db');

// Teste para inserir alguns dados no arquivo do banco
db.serialize(() => {
    /*
    db.run("CREATE TABLE users_to_usuarios (nome TEXT, email TEXT)");
  
    console.log('Sucesso na criacao do banco de dados');
  
    

    db.each("SELECT nome, email FROM users_to_usuarios", (err, row) => {
        console.log(row.nome + ": " + row.email);
    }); */ /*
    db.run ("INSERT INTO users_to_usuarios VALUES ('Ana', 'ana@gmail.com')");
    db.run ("INSERT INTO users_to_usuarios VALUES ('Gabriel', 'gabriel@gmail.com')");
    db.run ("INSERT INTO users_to_usuarios VALUES ('Luiz', 'Luiz@gmail.com')");
    db.run ("INSERT INTO users_to_usuarios VALUES ('Julia', 'julia@gmail.com')");
    */

    /* // Deletando a tabela
    db.run ("DELETE FROM users_to_usuarios"); */
  });
  
  db.close();