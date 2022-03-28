const { Users } = require('../models');

const create = async (req, res, next) => {
    const { displayName, email, password, image } = req.body;
    const message = { message: 'User already registered' };

    try {
        const findEmail = await Users.findOne({ where: { email } });
        if (findEmail) return res.status(409).json(message);

        const created = await Users.create({ displayName, email, password, image });
        return res.status(201).json(created);
    } catch (e) {
        next(e);
    }
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const userId = await Users.findOne({ where: { id } });

       return res.status().json(userId);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    create,
    getById,
};