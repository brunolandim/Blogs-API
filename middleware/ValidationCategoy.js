const validationNameCategory = (req, res, next) => {
    const { name } = req.body;
    const message = { message: '"name" is required' };
    if (!name) return res.status(400).json(message);

    next();
};

module.exports = {
    validationNameCategory,
};