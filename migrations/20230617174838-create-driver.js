'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.REAL,
        defaultValue: 5
      },
      phone: {
        type: Sequelize.STRING
      },
      online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      socketId: {
        type: Sequelize.STRING,
        unique: true
      },
      lat: DataTypes.REAL,
      lng: DataTypes.REAL,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Drivers');
  }
};