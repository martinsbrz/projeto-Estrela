const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./dbConfig');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); 

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota para buscar todos os usuários
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para buscar um usuário por ID
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 */
app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar um novo usuário
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Adiciona um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *     responses:
 *       200:
 *         description: Usuário adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 message:
 *                   type: string
 */
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, message: 'Usuário adicionado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar um usuário
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza o nome de um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  try {
    await db.query('UPDATE users SET name = ? WHERE id = ?', [name, userId]);
    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar um usuário
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TURMAS

app.get('/api/turmas', async(req, res) => {
  try {
    const [rows] = await db.query(`select * from turmas`);
    res.json({turmas: rows});
  } catch(err) {
    res.status(500).json({error: err.message});
  }
})

app.get('/api/turmas/:idadeturma', async(req, res) => {
  const idadeTurma = req.params.idadeturma;
  try {
    const [rows] = await db.query(`
      select a.nome
      from turmas t 
      join alunos_turmas at on t.id_turma = at.id_turma
      join alunos a on at.id_aluno = a.id_aluno
      where idade_turma = ?
    `, [idadeTurma]);
    res.json({turma: rows});
  } catch(err) {
    res.status(500).json({error: err.message});
  }
})

app.get('/api/turmas/data/:data', async (req, res) => {
  const data = req.params.data;
  try {
    const [rows] = await db.query(`
      select t.idade_turma, ct.inicio, ct.fim
      from aulas_turmas aut
      join turmas t on aut.id_turma = t.id_turma
      join cronograma_turma ct on t.id_turma = ct.id_turma
      where aut.data = ?
    `, [data]);
    res.json({dia: rows});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

// Configurando a porta da aplicação
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
