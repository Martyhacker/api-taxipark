'use strict';
const {
  Model
} = require('sequelize');
require("dotenv").config();
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Order}) {
      this.hasMany(Order, {
        foreignKey: "userId",
        as: "orders"
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    address: DataTypes.STRING,
    fcmToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    if (user.password) user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_ROUND));
  });
  return User;
};