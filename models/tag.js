'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
  }, {
      freezeTableName: true
  });
  Tag.associate = function(models) {
    Tag.hasMany(models.PostTag, {foreignKey: 'tagId'});
  }
  Tag.removeAttribute('createdAt');
  Tag.removeAttribute('updatedAt');
  return Tag;
};