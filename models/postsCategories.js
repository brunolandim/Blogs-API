module.exports = (sequelize, _DataTypes) => {
    const PostsCategory = sequelize.define('PostsCategory', {}, { timestamps: false });
    PostsCategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        foreignKey: 'postId',
        otherKey: 'categoryId',
        through: PostsCategory,
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'posts',
        foreignKey: 'categoryId',
        otherKey: 'postId',
        through: PostsCategory,
      });    
    };
    return PostsCategory;
  };