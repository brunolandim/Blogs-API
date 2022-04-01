module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    title: DataTypes.INTEGER,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });
 /*  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }; */

  return BlogPost;
};