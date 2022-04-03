const { BlogPost, PostsCategory, Category, User } = require('../models');

const create = async (req, res, _next) => {
  const { title, categoryIds, content } = req.body;
  const findCategory = await Category.findAll();
  const mapCategory = findCategory.map((el) => el.id);
  const foundId = categoryIds.every((el) => mapCategory.includes(el));
  if (!foundId) return res.status(400).send({ message: '"categoryIds" not found' });

  const newPost = await BlogPost.create({ 
    title,
    content,
    userId: req.dataToken.id,
    published: new Date().getTime(),
    updated: new Date().getTime(),
  });
  const { published, updated, ...post } = newPost.dataValues;
  const postId = newPost.dataValues.id;
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostsCategory.create({ postId, categoryId });
  }));
  return res.status(201).json(post);
};
const getAll = async (__req, res, next) => {
  try {
    const result = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attribuites: { exclude: 'password' } },
        { model: Category, as: 'categories' },
      ],
    });
    return res.status(200).json(result);
  } catch (e) {
    next(e.message);
  }
};
const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const idExist = await BlogPost.findByPk(id);
    if (!idExist || idExist === null) { 
      return res.status(404).json({ message: 'Post does not exist' }); 
    }

    const result = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attribuites: { exclude: 'password' } },
        { model: Category, as: 'categories' },
      ],
    });
    return res.status(200).json(result);
  } catch (e) {
    next(e.message);
  }
};

const editPost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
  const authorized = await BlogPost.findByPk(id, {
    include: [{ model: Category,
    as: 'categories',
    attribuites: { 
      exclude: PostsCategory } }],
  });
  if (authorized.userId !== req.dataToken.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  await authorized.set({ title, content });
  await authorized.save();

  return res.status(200).json(authorized);
  } catch (e) {
    next(e);
  }
};

const exclude = async (req, res, next) => {
  const { id } = req.params;
  try {
    const authorized = await BlogPost.findByPk(id);
    if (!authorized) return res.status(404).json({ message: 'Post does not exist' });
    if (authorized.userId !== req.dataToken.id) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    await authorized.destroy({ where: { id } });
    return res.status(204).end();
  } catch (e) {
    next(e.message);
  }
};

module.exports = {
    create,
    getAll,
    getById,
    editPost,
    exclude,
};