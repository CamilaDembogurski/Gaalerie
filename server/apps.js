const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Diretório de onde seus arquivos estáticos estão servidos
const publicDirectoryPath = path.join(__dirname, '../web');

// Configurar o Express para servir todos os arquivos estáticos a partir do diretório public
app.use(express.static(publicDirectoryPath));

app.use(express.json);

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/landingPage/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/login/login.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, './public/products/products.html'));
});
/*
app.post('/users', (req, res) => {
  const { login, name, email, password } = req.body;

  //garantia que todos os campos foram fornecidos
  if (!(login && name && email && password)) {
      return res.status(400).send("Por favor, forneça todos os campos: login, name, email, password.");
  }

  console.log(req.body);

  res.status(200).send("Usuário recebido com sucesso!");
});
*/
app.listen(port, () => {
  console.log(`O servidor está rodando em http://localhost:${port}`);
});