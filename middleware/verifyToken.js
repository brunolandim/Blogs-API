const jwt = require('jsonwebtoken');
require('dotenv/config');

const SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' }); 
    
    try {
    const decoded = jwt.verify(authorization, SECRET);
    req.dataToken = decoded.data;
    next();
    } catch (e) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = { verifyToken };