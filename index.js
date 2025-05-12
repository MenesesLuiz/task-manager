const express = require('express');
const app = express();
const tarefasRoutes = require('./routes/tarefas.js');
const authRoutes = require('./routes/auth.js');
const database = require('./config/index.js');

database;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tarefas', tarefasRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
