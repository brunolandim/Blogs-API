const { Categories } = require('../models');

const create = async (req, res, next) => {
    const { name } = req.body;
    try {
        const created = await Categories.create({ name });

        return res.status(201).json(created);
    } catch (e) {
        next(e);
    }
};

const getAll = async (__req, res, next) => {
    try {
        const categories = await Categories.findAll();
        
        res.status(200).json(categories);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    create,
    getAll,
};