'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  PostTag.associate = function(models) {
    PostTag.belongsTo(models.Post, {foreignKey: 'PostId'});
    PostTag.belongsTo(models.Tag, {foreignKey: 'TagId'});
  } 
  PostTag.removeAttribute('id');
  PostTag.removeAttribute('createdAt');
  PostTag.removeAttribute('updatedAt');

  return PostTag;
};