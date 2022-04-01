const jwt = require('jsonwebtoken');
require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '2d',
    algorithm: 'HS256',
};

module.exports = (payload = {}) => jwt.sign({ data: payload }, SECRET, jwtConfig);