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

app.get('/api/aulas/dia/:dia/', async (req, res) => {
  const dia = req.params.dia;
  try {
    const [rows] = await db.query(`
      select t.idade_turma, ct.inicio, ct.fim
      from cronograma_turma ct
      join turmas t on ct.id_turma = t.id_turma
      where ct.dia = ?
    `, [dia]);
    res.json({dia: rows});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

app.get('/api/turmas/idade/:idadeTurma/', async (req, res) => {
  const idadeTurma = req.params.idadeTurma;
  try {
    const [rows] = await db.query(`
      select t.id_turma, a.id_aluno, t.idade_turma, ct.inicio, a.nome, a.sobrenome, ct.dia
      from alunos_turmas at
      join turmas t on at.id_turma = t.id_turma 
      join alunos a on at.id_aluno = a.id_aluno
      join cronograma_turma ct on t.id_turma = ct.id_turma
      where t.idade_turma = ?;
    `, [idadeTurma]);
    res.json({turma: rows})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

app.get('/api/aula/aluno/:data', async (req, res) => {
  const data = req.params.data;
  try {
    const [rows] = await db.query(`
      select a.id_aluno, t.idade_turma, at2.status
      from aulas_turmas at2
      join alunos a on at2.id_aluno = a.id_aluno
      join turmas t on at2.id_turma = t.id_turma
      where at2.data = ?  
    `, [data]);
    res.json({alunos: rows})
  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

app.get('/api/registroaula/:data/:idTurma', async (req, res) => {
  const data = req.params.data;
  const idTurma = req.params.idTurma;
  try {
    const [rows] = await db.query(`
      select at.data, t.idade_turma, a.nome, a.sobrenome, at.status 
      from aulas_turmas at
      join turmas t on at.id_turma = t.id_turma 
      join alunos a on at.id_aluno = a.id_aluno 
      where at.data = ?
      and at.id_turma = ?
    `, [data, idTurma]);
    res.json({registroaula: rows});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

app.post('/api/turmas/registroaula', async (req, res) => {
  const {idTurma, idAluno, status, data, inicio} = req.body;
  try {
    const [verify] = await db.query(`select data, id_aluno from aulas_turmas where data = ? and id_aluno = ?`, [data, idAluno]);

    if (!verify.length) {
      await db.query(`
        insert into aulas_turmas (id_turma, id_aluno, status, data, inicio) values
        (?, ?, ?, ?, ?)
      `, [idTurma, idAluno, status, data, inicio]);
      res.json('Registro de frequência realizado');
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
})

// Configurando a porta da aplicação
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
