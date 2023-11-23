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
  storage: './database.sqlite',
});

class Address extends Model { }
Address.init(
  {
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    street: DataTypes.STRING,
    description: DataTypes.STRING,
    number: DataTypes.INTEGER,
  },
  { sequelize, modelName: 'Address' }
);

class User extends Model { }
User.init(
  {
    login: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    addressId: { type: Sequelize.INTEGER, references: { model: 'Addresses', key: 'id' } },
    isAdmin: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: 'User' }
);

class Purchase extends Model { }
Purchase.init(
  {
    total: DataTypes.FLOAT,
    liberated: DataTypes.BOOLEAN,
    userId: { type: Sequelize.INTEGER, references: { model: 'Users', key: 'id' } },
  },
  { sequelize, modelName: 'Purchase' }
);

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  orientation: DataTypes.STRING,
  artist: DataTypes.STRING,
  price: DataTypes.FLOAT,
  technique: DataTypes.STRING,
  dimension: DataTypes.STRING,
  available: DataTypes.BOOLEAN,
  category: DataTypes.STRING,
});

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

app.get('/login-products', (req, res) => {
  console.log(req)
  res.sendFile(path.join(publicDirectoryPath, './private/user/products/products.html'));
});

app.get('/login-account', (req, res) => {
  console.log(req)
  res.sendFile(path.join(publicDirectoryPath, './private/user/account/account.html'));
});

app.delete('/login-account/:id', async (req, res) => {
  try {
    const response = await User.destroy({ where: { id: req.params.id } })
    res.status(203).send('Usuário deletado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar usuário.');
  }
})

app.get('/login-account/:id', async (req, res) => {
  try {
    const response = await User.findOne({ where: { id: req.params.id } })
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar usuário.');
  }
})


app.get('/login-payment', (req, res) => {
  console.log(req)
  res.sendFile(path.join(publicDirectoryPath, './private/user/payment/payment.html'));
});

app.get('/login-products', (req, res) => {
  console.log(req)
  res.sendFile(path.join(publicDirectoryPath, './private/user/products/products.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/products/products.html'));
});

app.get('/products/getall', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao recuperar produtos.');
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const response = await Product.findOne({ where: { id: req.params.id } })
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao procurar produto.');
  }
});

app.put('/products/:id', async (req, res) => {
  let id = req.params.id 
  const { name, url, technique, dimension, orientation, category, price } = req.body;

  if (!( name && url && technique && dimension && category && orientation && price && id)) {
    return res.status(400).send('Por favor, forneça todos os campos: name, email');
  }
  console.log(id)
  try {
    
    const product = await Product.update(
      {
        name: name,
        url: url,
        technique: technique,
        dimension: dimension,
        orientation: orientation,
        category: category,
        price: price,
      },{
        where: {id: id}
      });

    console.log(product);
    res.status(200).send('Produto editado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao editar produto.');
  }
});

app.get('/adm', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/landingPage/index.html'));
});

app.get('/adm-products', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/products/products.html'));
});

app.get('/adm-account', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/account/account.html'));
});

app.get('/adm-purchases', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/purchases/purchases.html'));
});

app.get('/adm-users', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './private/adm/users/users.html'));
});

app.get('/addresses/:id', async (req, res) => {
  try {
    const response = await Address.findOne({ where: { id: req.params.id } })
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao procurar endereço.');
  }
});

app.post('/users', async (req, res) => {
  const { login, name, email, password } = req.body;

  if (!(login && name && email && password)) {
    return res.status(400).send('Por favor, forneça todos os campos: login, name, email, password.');
  }

  try {
    const user = await User.create({
      login,
      name,
      email,
      password,
      addressId: 1,
      isAdmin: false,
    });

    console.log(user.toJSON());
    res.status(200).send('Usuário criado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar usuário.');
  }
});

app.put('/users/:id', async (req, res) => {
  let id = req.params.id 
  const { name, email } = req.body;

  if (!( name && email && id)) {
    return res.status(400).send('Por favor, forneça todos os campos: name, email');
  }
  console.log(id)
  try {
    
    const user = await User.update(
      {
        name: name,
        email: email,
      },{
        where: {id: id}
      });

    console.log(user);
    res.status(200).send('Usuário editado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao editar usuário.');
  }
});

app.patch('/users/:id', async (req, res) => {
  let id = req.params.id 
  try {
    
    const user = await User.update(
      {
       isAdmin: true
      },{
        where: {id: id}
      });

    console.log(user);
    res.status(200).send('Usuário virou adm!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao virar adm.');
  }
});

app.delete('/adm-users/:id', async (req, res) => {
  let id = req.params.id 
  try {
    
    const user = await User.update(
      {
       isAdmin: false
      },{
        where: {id: id}
      });

    console.log(user);
    res.status(200).send('Usuário desvirou adm!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao virar adm.');
  }
});

app.post('/admproducts', async (req, res) => {
  const { name, url, artist, technique, orientation, dimension, category, price } = req.body;
  try {
    const product = await Product.create({
      name,
      url,
      artist,
      technique,
      orientation,
      dimension,
      category,
      price,
      available: true,
    });

    console.log(product.toJSON());
    res.status(200).send('Produto criado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar produto.');
  }
});

app.delete('/admproducts/:id', async (req, res) => {
  try {
    const response = await Product.destroy({ where: { id: req.params.id } })
    res.status(203).send('Produto deletado com sucesso');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao deletar produto.');
  }
})

app.get('/users/findall', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao recuperar usuários.');
  }
});

app.post('/logar', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ where: { login: login, password: password } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    console.log(user);

    if (user.isAdmin) {
      // Se o usuário for um administrador, redirecionar para a página de administrador
      return res.status(200).json({ message: 'Login bem-sucedido!', adm: true, id: user.id });
    }
    res.json({ message: 'Login bem-sucedido!', adm: false, id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao verificar o usuário', detalhes: error.message });
  }
});

app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});
