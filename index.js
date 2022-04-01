const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const { validationDisplayName,
        validationEmail,
        validationPassword } = require('./middleware/ValidationUser');
const { verifyToken } = require('./middleware/verifyToken');
const { validationNameCategory } = require('./middleware/ValidationCategoy'); 

const Category = require('./controller/category');
const User = require('./controller/user');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.get('/user/:id', verifyToken, User.getById);
app.get('/user', verifyToken, User.getAll);
app.post('/user', validationEmail, validationPassword, validationDisplayName, User.create);
app.delete('/user/:id', verifyToken, User.deleteUser);

app.post('/login', validationEmail, validationPassword, User.login);
app.post('/categories', validationNameCategory, verifyToken, Category.create);
app.get('/categories', verifyToken, Category.getAll);
