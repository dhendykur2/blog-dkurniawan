'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        PostTag.belongsTo(models.Post, {foreignKey: 'postId'})
        PostTag.belongsTo(models.Tag, {foreignKey: 'tagId'})
      }
    },
    freezeTableName: true
  });
  PostTag.removeAttribute('id');
  return PostTag;
};