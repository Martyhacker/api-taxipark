const { Op } = require("sequelize");

const capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.user_search = (keyword) => {
  let keywords = [
    `%${keyword}%`,
    `%${keyword.toLowerCase()}%`,
    `%${keyword.toUpperCase()}%`,
    `%${capitalize(keyword.toLowerCase())}%`,
  ];

  return {
    [Op.or]: [
      {
        username: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
      {
        phone: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
      {
        address: {
          [Op.eq]: keyword,
        },
      },
    ],
  };
};
exports.driver_search = (keyword) => {
  let keywords = [
    `%${keyword}%`,
    `%${keyword.toLowerCase()}%`,
    `%${keyword.toUpperCase()}%`,
    `%${capitalize(keyword.toLowerCase())}%`,
  ];

  return {
    [Op.or]: [
      {
        username: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
      {
        phone: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
    ],
  };
};
exports.order_search = (keyword) => {
  let keywords = [
    `%${keyword}%`,
    `%${keyword.toLowerCase()}%`,
    `%${keyword.toUpperCase()}%`,
    `%${capitalize(keyword.toLowerCase())}%`,
  ];

  return {
    [Op.or]: [
      {
        start: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
      {
        destination: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
      {
        username: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
      {
        phone: {
          [Op.like]: {
            [Op.any]: keywords,
          },
        },
      },
    ],
  };
};