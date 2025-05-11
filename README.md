
!! Gerenciador de Tarefas com Node.js (Backend)

Este é um projeto de **gerenciador de tarefas básico** com autenticação usando **Node.js**, **Express**, e **JWT (JSON Web Token)**. O sistema permite:

- Registro de usuário
- Login com geração de token
- Criação, leitura, atualização e exclusão de tarefas (CRUD)
- Autenticação protegendo rotas com JWT

---

## 📁 Estrutura de Pastas e Arquivos

```
task-manager/
├── controllers/
│   ├── authController.js
│   └── tarefaController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── routes/
│   ├── auth.js
│   └── tarefas.js
│
├── public/             <- (Frontend será construído aqui)
│
├── index.js              <- Arquivo principal do servidor Express
├── package.json
```

---

## 📂 Explicações dos Arquivos

### 🔧 `index.js`
Arquivo principal da aplicação. Ele:
- Inicia o servidor Express
- Aplica middlewares (como `express.json`)
- Usa as rotas definidas em `/routes`

---

### 📁 `controllers/`

#### `authController.js`
Controla a lógica de autenticação:
- `registrarUsuario`: Cadastra novos usuários e salva em memória (mock de banco de dados).
- `loginUsuario`: Valida email/senha, gera token JWT.

#### `tarefaController.js`
Controla as operações de tarefas:
- `criarTarefa`: Cria uma nova tarefa ligada ao usuário autenticado.
- `listarTarefas`: Retorna apenas as tarefas do usuário.
- `atualizarTarefa`: Permite editar título e status (concluída).
- `deletarTarefa`: Remove a tarefa.

---

### 📁 `middlewares/`

#### `authMiddleware.js`
Middleware que:
- Lê o token JWT do header `Authorization`
- Verifica sua validade
- Injeta o usuário decodificado na requisição (`req.usuario`)

Usado para proteger rotas que exigem autenticação.

---

### 📁 `routes/`

#### `auth.js`
Define rotas públicas:
- `POST /auth/registrar`: Cadastro
- `POST /auth/login`: Login

#### `tarefas.js`
Define rotas protegidas por autenticação:
- `POST /tarefas`: Criação de tarefas
- `GET /tarefas`: Lista todas as tarefas do usuário autenticado
- `PUT /tarefas/:id`: Atualiza uma tarefa
- `DELETE /tarefas/:id`: Deleta uma tarefa

---

## 🚀 Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/MenesesLuiz/task-manager.git
cd task-manager
```

2. Instale as dependências:
```bash
npm install (dependências do package.json)
```

3. Inicie o servidor:
```bash
node app.js
```

Servidor será iniciado em `http://localhost:3000`.

---

## 📌 Observações

- O sistema ainda **não possui persistência de dados real** (não usa banco de dados).
- As informações de usuários e tarefas estão em **arrays em memória**, e serão perdidas ao reiniciar o servidor.
- JWT é usado para proteger as rotas privadas.
- O frontend será adicionado na pasta `/public`.

---

## 🔐 Exemplo de uso com token

Após login, envie o token nas requisições às rotas protegidas:

```
GET /tarefas
Authorization: Bearer SEU_TOKEN_JWT
```

---

## ✨ Próximas etapas

- [x] Backend funcional com autenticação JWT
- [ ] Implementação do frontend com HTML/CSS/JS puro
- [ ] Integração frontend-backend com fetch()
- [ ] Substituição do "banco de dados em memória" por MySQL

---

Feito por Luiz Felipe.
