'use strict';
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          username: "admin",
          password: await bcrypt.hash("admin", 12),
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
