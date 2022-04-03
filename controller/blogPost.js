const { BlogPost, PostsCategory, Category, Users } = require('../models');

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

module.exports = {
    create,
};