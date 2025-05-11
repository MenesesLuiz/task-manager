let tarefas = [];

exports.criarTarefa = (req, res) => {
    const {titulo, descricao, concluida} = req.body;

    if (!titulo || !descricao) {
        return res.status(400).json({ mensagem: 'Título e descrição são obrigatórios.' });
    }

    const novaTarefa = {
        id: Date.now().toString(),
        titulo,
        descricao,
        concluida,
        usuarioId: req.usuario.id,
    };

    tarefas.push(novaTarefa);

    res.status(201).json({ mensagem: 'Tarefa criada com sucesso.', tarefa: novaTarefa });
};

exports.listarTarefas = (req, res) => {
    const tarefasDoUsuario = tarefas.filter(t => t.usuarioId === req.usuario.id);
    res.json(tarefasDoUsuario);
};

exports.editarTarefa = (req, res) => {
    const id = req.params.id;
    const{titulo, descricao, concluida} = req.body;

    const tarefa = tarefas.find(t => t.id === id && t.usuarioId === req.usuarioId);
    if (!tarefa) {
        return res.status(404).json({mensagem: 'Tarefa não encontrada ou não autorizada.'});
    }

    if (titulo) tarefa.titulo = titulo;
    if (descricao) tarefa.descricao = descricao;
    if (concluida !== undefined) tarefa.concluida = concluida;

    res.json({mensagem: 'Tarefa atualizada com sucesso.', tarefa})
};

exports.deletarTarefa = (req, res) => {
    const id = req.params.id;

    const index = tarefas.findIndex(t => t.id === id && t.usuario === req.usuarioId);
    if (index === -1) {
        return res.status(404).json({mensagem: 'Tarefa não encontrada ou não autorizada.'})
    }

    tarefas.splice(index, 1);

    res.status(204).json({mensagem: 'Tarefa excluída com êxito.', tarefa});
};
