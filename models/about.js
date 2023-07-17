'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class About extends Model {
    static associate(models) {
    }
  }
  About.init({
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'About',
    tableName: 'About'
  });
  return About;
};