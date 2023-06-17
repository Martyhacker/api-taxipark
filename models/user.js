'use strict';
const {
  Model
} = require('sequelize');
require("dotenv").config();
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    if (user.password) user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_ROUND));
  });
  return User;
};