'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true
    },
    postedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.User,
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Post.associate = (models) => {
    Post.belongsToMany(models.Tag, {
      through: 'PostTag'
    })
    Post.belongsTo(models.User, {
      foreignKey: 'postedBy'
    })
  }

  return Post;
};