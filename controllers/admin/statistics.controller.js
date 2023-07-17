const { Driver, User, Order } = require('../../models');
const catchAsync = require('../../utils/catchAsync');
const { Op } = require('sequelize');
exports.getStatistics = catchAsync(async (req, res) => {
  const nDays = Number(req.query && req.query.d) || 30;

  const msDay = 24 * 60 * 60 * 1000,
    today = new Date(new Date().setHours(0, 0, 0, 0));

  const tempFunction = async (Model, _nDays) => {
    const res = [];

    for (let i = _nDays; i >= 0; i--) {
      res.push({
        day: i,
        count: await Model.count({
          where: {
            [Op.and]: [
              {
                createdAt: { [Op.gte]: new Date(today.getTime() - i * msDay) },
              },
              {
                createdAt: {
                  [Op.lte]: new Date(today.getTime() - (i - 1) * msDay),
                },
              },
            ],
          },
        }),
      });
    }

    return res;
  };

  const driverCountByDay = await tempFunction(Driver, nDays),
    orderCountByDay = await tempFunction(Order, nDays),
    userCountByDay = await tempFunction(User, nDays);

  // client response
  res.status(200).json({
    success: true,
    orderCountByDay,
    driverCountByDay,
    userCountByDay,
  });
});