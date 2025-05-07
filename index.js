const express = require('express');
const app = express();
app.use(express.json());

//array para armazenar as tarefas
let tarefas = [];

//rota para exibir mensagem de teste
app.get('/', (req, res) => {
    res.send('API de Gerenciamento de tarefas está funcionando.')
});


app.post('/tarefas', (req, res) => {
    const {titulo} = req.body;
    if (!titulo) {
        return res.status(400).json({error: 'O Título da tarefa é obrigatório.'});
    }


    const novaTarefa = {
        id: tarefas.length + 1,
        titulo,
        concluida: false
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

app.put('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {titulo, concluida} = req.body;

    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({error: 'Tarefa não existe.'})
    }

    if (titulo !== undefined) tarefa.titulo = titulo;
    if (concluida !== undefined) tarefa.concluida = concluida;

    res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = tarefas.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({error: 'Tarefa não encontrada.'});
    }

    tarefas.splice(index, 1);

    res.status(204).send({message: 'Tarefa excluída com sucesso.'});
});

//rota
const port = 3000
app.listen(port, () => {
    console.log(`Servidor está online na porta ${port}`)
});