const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '191.252.120.105',      // endereço do servidor do banco de dados
  user: 'adminEstrela',     // usuário do banco
  password: 'a246Projeto@',   // senha do usuário
  database: 'projetoEstrelaHomolog'    // nome do banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('Conectado ao MySQL!');
});

module.exports = connection;
