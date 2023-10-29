const path = require('path');
const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');
const app = express();
const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../web');

app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

class Address extends Model{} 
Address.init( {
  country: DataTypes.STRING,
  state: DataTypes.STRING,
  city: DataTypes.STRING,
  neighborhood: DataTypes.STRING,
  street: DataTypes.STRING,
  description: DataTypes.STRING,
  number: DataTypes.INTEGER
}, {sequelize, modelName: 'Address'});

class User extends Model{}
User.init( {
  login: DataTypes.STRING,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  addressId: {type: Sequelize.INTEGER, references: {model: 'Addresses', key: 'id'}},
  isAdmin: DataTypes.BOOLEAN
}, {sequelize, modelName: 'User'});

class Purchase extends Model{}
Purchase.init( {
  total: DataTypes.FLOAT,
  liberated: DataTypes.BOOLEAN,
  userId: {type: Sequelize.INTEGER, references: {model: 'Users', key: 'id'}},
}, {sequelize, modelName: 'Purchase'});

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  artist: DataTypes.STRING,
  price: DataTypes.FLOAT,
  date: DataTypes.DATE,
  technique: DataTypes.STRING,
  dimension: DataTypes.STRING,
  available: DataTypes.BOOLEAN,
  category: DataTypes.STRING,
  purchaseId: {type: Sequelize.INTEGER, references: {model: 'Products', key: 'id'}},
}, {});


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

app.get('/adm', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/landingPage/index.html'));
});

app.get('/admproducts', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/products/products.html'));
});

app.get('/admaccount', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/account/account.html'));
});

app.get('/admpurchases', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/purchases/purchases.html'));
});

app.get('/admusers', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/users/users.html'));
});

app.post('/users', async (req, res) => {
  const { login, name, email, password } = req.body;

  if (!(login && name && email && password)) {
    return res.status(400).send("Por favor, forneça todos os campos: login, name, email, password.");
  }

  try {
    const user = await User.create({
      login,
      name,
      email,
      password,
      addressId: 1, 
      isAdmin: false
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

app.post('/logar', async (req, res) => {
  const { login, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { login: login, password: password } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    console.log(user)
  
    if (user.isAdmin) {
      // Se o usuário for um administrador, redirecionar para a página de administrador
      return res.status(200).json({message: 'Login bem-sucedido!', adm: true });
    }
    res.json({ message: 'Login bem-sucedido!', adm: false });
  }
    catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao verificar o usuário', detalhes: error.message });
  }
});

app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});
