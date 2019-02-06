'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: 'uniqueConstraint'
    },
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Post, {foreignKey: 'postedBy'})
      }
    },
    freezeTableName: true
  });
  return User;
};