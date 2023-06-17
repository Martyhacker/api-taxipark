'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate(models) {
    }
  }
  Driver.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    socketId: {
      type: DataTypes.STRING,
      unique: true
    },
    lat: DataTypes.REAL,
    lng: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};