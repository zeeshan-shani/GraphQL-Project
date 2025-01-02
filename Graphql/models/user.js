'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // A User can have many Posts
      User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    { sequelize, modelName: 'User' }
  );
  return User;
};
