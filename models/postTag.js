'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  PostTag.associate = function(models) {
    PostTag.belongsTo(models.Post, {foreignKey: 'postId'});
    PostTag.belongsTo(models.Tag, {foreignKey: 'tagId'});
  }
  PostTag.removeAttribute('id');
  PostTag.removeAttribute('createdAt');
  PostTag.removeAttribute('updatedAt');

  return PostTag;
};