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

class LinkPurchaseProduct extends Model { }
LinkPurchaseProduct.init(
  {
    PurchaseId: { type: Sequelize.INTEGER, references: { model: 'Purchases', key: 'id' } },
    ProductId: { type: Sequelize.INTEGER, references: { model: 'Products', key: 'id' } },
  },
  { sequelize, modelName: 'LinkPurchaseProduct' }
  
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
Purchase.belongsToMany(Product, { through: LinkPurchaseProduct });
Product.belongsToMany(Purchase, { through: LinkPurchaseProduct });

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
    const products = await Product.findAll({where: {available: true}});
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

app.get('/users/:id', async (req, res) => {
  try {
    const response = await User.findOne({ where: { id: req.params.id } })
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao procurar usuário.');
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

app.get('/purchases/:id', async (req, res) => {
  try {
    const response = await Purchase.findOne({ where: { id: req.params.id } })
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao procurar compra.');
  }
});

app.put('/purchases-liberate/:id', async (req, res) => {
  let id = req.params.id 
  
  try {
    const purchase = await Purchase.update(
      {
        liberated: true,
      },{
        where: {id: id}
      });

    res.status(200).send('Compra liberada com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao liberar compra.');
  }
});

app.put('/products-liberate/:id', async (req, res) => {
  let id = req.params.id 
  
  try {
    const product = await Product.update(
      {
        available: false,
      },{
        where: {id: id}
      });

    res.status(200).send('Produto indisponibilizado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao fechar produto.');
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

app.get('/purchases/getall', async (req, res) => {
  try {
    const purchases = await Purchase.findAll({include: [{
      model: Product, through: {attributes: []}
    }]});
    
    res.status(200).json(purchases);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao recuperar compras.');
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

app.post('/purchases', async (req, res) => {
  const { total, userId, products, liberated } = req.body;
  let resultPurchase
  try {
    const purchase = await Purchase.create({
      total,
      userId,
      liberated,  
    }).then((result) => {
      resultPurchase = result
    });
    for(let product of products){
      await LinkPurchaseProduct.create({
        PurchaseId: resultPurchase.id,
        ProductId: product
      })
    }
    res.status(200).send(resultPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar compra.');
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

app.post('/add-address', async (req, res) => {
  const { country, state, city, neighborhood, street, description, number, userId } = req.body;
  try {
    let newAddressId
    const address = await Address.create({
      country,
      state,
      city,
      neighborhood,
      street,
      description,
      number
    }).then((result) => {
      newAddressId = result.id
    });
    await User.update({
      addressId: newAddressId
    }, {where: {
      id: userId,
    }})
    console.log(address.toJSON());
    res.status(200).send('Endereço criado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar endereço.');
  }
});

app.get('/adm-users/findall', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao recuperar usuários.');
  }
});

app.put('/edit-address/:id', async (req, res) => {
  let id = req.params.id
  const { country, state, city, neighborhood, street, description, number } = req.body;
  try {
    const address = await Address.update({
      country,
      state,
      city,
      neighborhood,
      street,
      description,
      number
    },{
        where: {id: id}
    });

    res.status(200).send('Endereço editado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao editar endereço.');
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
