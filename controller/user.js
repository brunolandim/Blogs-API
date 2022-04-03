const { User } = require('../models');
const jwtToken = require('../token/jwtGenerate');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const found = await User.findOne({ where: { email, password } });
        if (!found) return res.status(400).json({ message: 'Invalid fields' });

        const token = jwtToken({ id: found.id, password });
        return res.status(200).json({ token });
    } catch (e) {
        next(e);
    }
};

const create = async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const message = { message: 'User already registered' };

    try {
        const findEmail = await User.findOne({ where: { email } });
        if (findEmail) return res.status(409).json(message);

        const created = await User.create({ displayName, email, password, image });
        const token = jwtToken({ id: created.id, displayName });

        return res.status(201).json(token);
    } catch (e) {
        next(e);
    }
};

const getAll = async (__req, res, next) => {
    try {
        const result = await User.findAll({});
        return res.status(200).json(result);
    } catch (e) {
        next(e);
    }
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const userId = await User.findOne({ where: { id } });
        if (userId) return res.status(200).json(userId);        
        
        return res.status(404).json({ message: 'User does not exist' });
    } catch (e) {
        next(e);
    }
};

const deleteUser = async (req, res, next) => {
    const { id } = req.dataToken;
    try {
        const findUser = await User.findByPk(id);
        await findUser.destroy();
        
        return res.status(204).end();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    login,
    create,
    getAll,
    getById,
    deleteUser,
};