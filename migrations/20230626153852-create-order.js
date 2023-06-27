'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.REAL
      },
      start_lat: {
        type: Sequelize.REAL
      },
      start_lon: {
        type: Sequelize.REAL
      },
      dest_lat: {
        type: Sequelize.REAL
      },
      dest_lon: {
        type: Sequelize.REAL
      },
      status: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.DATE
      },
      username: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
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
    await queryInterface.dropTable('Orders');
  }
};