'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true
    },
    postedBy: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Post.hasMany(models.PostTag, {foreignKey: 'postId'})
        Post.belongsTo(models.User, {foreignKey: 'postedBy'})
      }
    },
    freezeTableName: true
  });
  return Post;
};