const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Order, Sequelize,Driver, Review } = require("../../models");
const {Op} = require("sequelize");
exports.getAllOrders = catchAsync(async (req, res, next) => {
    const {status,offset} = req.query;
    const limit = req.query.limit || 20;
    var where = {};
    where.userId = req.user.id;
    if (status && status == "ACTIVES") where.status = { [Op.or]: ["ACCEPTED", "WAITING"] };
    if (status && status != "ACTIVES") where.status = status;
    const { count, rows } = await Order.findAndCountAll({
        limit, offset, where, include: [{model: Driver, as: "driver", attributes: ["username", "phone", "rating"]}]
    });
    return res.status(200).json({ count, data: rows });
})
exports.getOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findOne({ where: { id: req.params.id } });
    if (!order)
        return next(new AppError("This order not found", 404));
    return res.status(200).send(order);
})
exports.addOrder = catchAsync(async (req, res, next) => {
    var { username, phone, start, destination, distance, start_lat, start_lon, dest_lat, dest_lon, order_type, time } = req.body;
    if(!username) username = req.user.username;
    if(!phone) phone = req.user.phone;
    if(!time) time = Sequelize.fn('now');
    console.log(req.body);

    const order = await Order.create({
        userId: req.user.id,
        username, phone, start, destination, distance, start_lat, start_lon, dest_lat, dest_lon, order_type, time
    });
    return res.status(201).send(order);
})
