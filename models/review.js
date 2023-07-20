'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({User, Driver}) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
      });
      // this.belongsTo(Driver, {
      //   foreignKey: "driverId",
      //   as: "driver"
      // });
    }
  }
  Review.init({
    point: DataTypes.REAL
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};