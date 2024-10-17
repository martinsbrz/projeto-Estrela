const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Abrindo ou criando o banco de dados SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados: ', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    // Criando a tabela Users, se não existir
    db.run(
      `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
      );`,
      (err) => {
        if (err) {
          console.error('Erro ao criar a tabela: ', err.message);
        } else {
          console.log('Tabela Users criada ou já existe.');
        }
      }
    );
  }
});

module.exports = db;
