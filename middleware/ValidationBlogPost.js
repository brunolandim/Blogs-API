const validationTitle = (req, res, next) => {
    const { title } = req.body;
    const message = { message: '"title" is required' };
    if (!title) return res.status(400).json(message);

    next();
};
const validationContent = (req, res, next) => {
    const { content } = req.body;
    const message = { message: '"content" is required' };
    if (!content) return res.status(400).json(message);

    next();
};
const validationCategotyId = (req, res, next) => {
    const { categoryIds } = req.body;
    const message = { message: '"categoryIds" is required' };
    if (!categoryIds) return res.status(400).json(message);

    next();
};
const notAutorized = (req, res, next) => {
    const { categoryIds } = req.body;
    if (categoryIds) return res.status(400).send({ message: 'Categories cannot be edited' });
    next();
};

module.exports = {
    validationTitle,
    validationContent,
    validationCategotyId,
    notAutorized,
};