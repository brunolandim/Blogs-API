const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const { validationDisplayName,
        validationEmail,
        validationPassword } = require('./middleware/ValidationUser');
const User = require('./controller/user');

const app = express();
app.use(bodyParser.json());

app.listen(process.env.PORT, () => console.log(`ouvindo porta ${process.env.PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.get('/user/:id', User.getById);
app.get('/user', User.getAll);
app.post('/user', validationEmail, validationPassword, validationDisplayName, User.create);
app.delete('/user/:id', User.deleteUser);

app.post('/login', validationEmail, validationPassword, User.login);