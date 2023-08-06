const path = require('path');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Diretório de onde os arquivos estáticos estão servidos
const publicDirectoryPath = path.join(__dirname, '../web');

// Configurar o Express para servir todos os arquivos estáticos a partir do diretório public
app.use(express.static(publicDirectoryPath));
// Configurar o middleware para tratar dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Criar uma instância do banco de dados.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definir um modelo.
const User = sequelize.define('User', {
  login: DataTypes.STRING,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {});

// Sincronizar todos os modelos.
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync();
    console.log('Banco de dados sincronizado.');
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
  }
})();

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/landingPage/index.html'));
});

app.get('/landingPage', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/user/landingPage/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/login/login.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/products/products.html'));
});

app.post('/users', async (req, res) => {
  const { login, name, email, password } = req.body;

  if (!(login && name && email && password)) {
    return res.status(400).send("Por favor, forneça todos os campos: login, name, email, password.");
  }

  try {
    // Cria um novo usuário no banco de dados.
    const user = await User.create({
      login,
      name,
      email,
      password
    });

    console.log(user.toJSON());
    res.status(200).send("Usuário criado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar usuário.");
  }
});

app.get('/users/findall', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao recuperar usuários.");
  }
});

// Rota para o login de usuários
app.post('/logar', async (req, res) => {
  const { login, password } = req.body;
  try {
    const users = await User.findOne({ where: { login: login, password: password } });
    if (!users) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Caso as credenciais estejam corretas, o login foi bem sucedido
    res.json({ message: 'Login bem sucedido!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao verificar o usuário', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});
