'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({User, Driver}) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
      }),
      this.belongsTo(Driver, {
        foreignKey: "driverId",
        as: "driver"
      })
    }
  }
  Order.init({
    username: DataTypes.STRING,
    phone: DataTypes.STRING,
    start: DataTypes.STRING,
    destination: DataTypes.STRING,
    price: {
      type: DataTypes.REAL,
      defaultValue: 20
    },
    distance: DataTypes.REAL,
    start_lat: DataTypes.REAL,
    start_lon: DataTypes.REAL,
    dest_lat: DataTypes.REAL,
    dest_lon: DataTypes.REAL,
    order_type: {
      type: DataTypes.STRING,
      defaultValue: "TAXI" //[TAXI, SOBERDRIVER, COURIER]
    },
    counter_start_time: {
      type: DataTypes.DATE,
    },
    accepted_time: {
      type: DataTypes.DATE,
    },
    ended_time: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "WAITING" //[WAITING, FINISHED, CANCELLED, ACCEPTED]
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now")
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};