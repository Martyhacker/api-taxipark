'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");

require("dotenv").config();
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate({ Order, Review }) {
      this.hasMany(Review, {
        foreignKey: "driverId",
        as: "reviews"
      });
      this.hasMany(Order, {
        foreignKey: "driverId",
        as: "orders"
      })
    }
  }
  Driver.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lat: DataTypes.REAL,
    lng: DataTypes.REAL,
    degree: {
      type: DataTypes.INTEGER,
      defaultValue: 90
    },
    fcmToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  Driver.beforeCreate(async (driver, options) => {
    if (driver.password) driver.password = await bcrypt.hash(driver.password, parseInt(process.env.BCRYPT_ROUND));
  });
  return Driver;
};