const path = require('path');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// Diretório de onde os arquivos estáticos estão servidos
const publicDirectoryPath = path.join(__dirname, '../web');

// Configurar o Express para servir todos os arquivos estáticos a partir do diretório public
app.use(express.static(publicDirectoryPath));

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
sequelize.sync();

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/landingPage/index.html'));
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

app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});