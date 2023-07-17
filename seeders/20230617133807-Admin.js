'use strict';
const bcrypt = require("bcryptjs");
require("dotenv").config();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          username: "admin",
          password: await bcrypt.hash("admin", parseInt(process.env.BCRYPT_ROUND)),
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
