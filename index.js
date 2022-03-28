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

app.post('/user', validationEmail, validationPassword, validationDisplayName, User.create);
app.post('/login');