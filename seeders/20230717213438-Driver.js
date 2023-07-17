'use strict';
const bcrypt = require("bcryptjs");
require("dotenv").config();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Drivers",
      [
        {
          username: "Daniel Driver",
          password: await bcrypt.hash("123456", parseInt(process.env.BCRYPT_ROUND)),
          lat: 37.938909783732505,
          lng: 58.39080121860015,
          phone: "+99367000000",
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
  }
};
