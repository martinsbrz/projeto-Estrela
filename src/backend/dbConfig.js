const mysql = require('mysql2');

const pool = mysql.createPool({
  // host: '191.252.120.105',
  host: 'localhost',
  port: 3306,
  user: 'adminEstrela',
  password: 'a246Projeto@',
  database: 'projetoEstrelaHomolog',
  waitForConnections: true,      // Faz com que as solicitações aguardem uma conexão em vez de gerar erros
  connectionLimit: 10,           // Número máximo de conexões no pool
  queueLimit: 0                  // Zero para desativar o limite de filas
});

// Exporta o pool para que seja usado em outras partes do código
module.exports = pool.promise();  // Usando promessas para suporte ao async/await
