const express = require('express');
const app = express();
const db = require('./sqlite'); // Importando o arquivo de conexão com SQLite
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Rota para buscar todos os usuários
app.get('/users', (req, res) => {
  db.all('SELECT * FROM Users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return "teste";
    }
    res.json({ users: rows });
  });
});

// Rota para buscar um usuário por ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.get('SELECT * FROM Users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return "teste";
    }
    res.json({ user: row });
  });
});

// Rota para adicionar um novo usuário
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  db.run('INSERT INTO Users (name, age) VALUES (?, ?)', [name, age], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, message: 'Usuário adicionado com sucesso' });
  });
});

// Rota para atualizar um usuário
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, age } = req.body;
  db.run('UPDATE Users SET name = ?, age = ? WHERE id = ?', [name, age, userId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
});

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.run('DELETE FROM Users WHERE id = ?', [userId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usuário deletado com sucesso' });
  });
});

// Configurando a porta da aplicação
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
