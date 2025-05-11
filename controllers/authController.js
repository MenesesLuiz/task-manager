const bcrypt = require('bcrypt');

//banco de dados em memoria
const usuarios = [];

exports.registrarUsuario = async (req, res) => {
  const {nome, email, senha} = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: 'Preencha nome, email e senha.' });
  }

  const existeUsuario = usuarios.find(usuario => usuario.email === email);
  if (existeUsuario) {
    return res.status(409).json({ mensagem: 'Email já registrado.' });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      senha: senhaCriptografada
    };

    usuarios.push(novoUsuario);

    return res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
  } catch (erro) {
    return res.status(500).json({ mensagem: 'Erro no servidor', erro: erro.message });
  }
};


const jwt = require('jsonwebtoken');

exports.loginUsuario = async (req, res) => {
    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(400).json({mensagem: 'Preencha os campos de email e senha.'})
    }

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
        return res.status(401).json({mensagem: 'Email ou senha inválidos'})
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        return res.status(401).json({mensagem: 'Email ou senha inválidos.'})
    }

    const token = jwt.sign(
        {id: usuario.id, email: usuario.email, nome: usuario.nome},
        'Seguro',
        {expiresIn: '1h'}
    );

    return res.status(200).json({mensagem: 'Login realizado com sucesso', token});
};
