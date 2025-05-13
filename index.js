const express = require('express');
const app = express();
const tarefasRoutes = require('./routes/tarefas.js');
const authRoutes = require('./routes/auth.js');
const database = require('./config/index.js');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tarefas', tarefasRoutes);

PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
