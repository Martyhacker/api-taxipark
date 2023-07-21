const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Order, User } = require("../../models");
const { Op } = require("sequelize");
const {sendNotification} = require("../../utils/sendNotification")
exports.getMyOrders = catchAsync(async (req, res, next) => {
    const { status, offset } = req.query;
    const limit = req.query.limit || 20;
    var where = {};
    where.driverId = req.user.id;
    if (typeof status === "object") where.status = { [Op.or]: status };
    if (typeof status === "string") where.status = status;
    const { count, rows } = await Order.findAndCountAll({
        limit, offset,
        where
    })
    return res.status(200).json({ count, data: rows });
});
exports.updateMyOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findOne({ where: { id: req.params.id } });
    if (!order)
        return next(new AppError("This order not found", 404));
    if (req.body.counter_start_time) req.body.counter_start_time = new Date();
    await order.update(req.body);
    return res.status(200).send(order);
});

exports.changeOrderStatus = catchAsync(async (req, res, next) => {
    const order = await Order.findOne({ where: { id: req.params.id } });
    const user = await User.findOne({where: {id: order.userId}});
    if (order.driverId != req.user.id)
        return next(new AppError("This is not yours"));
    if (!order)
        return next(new AppError("This order not found", 404));
    const { status } = req.body;
    if (!status)
        return next(new AppError("Please provide status correctly", 500));
    console.log(status, typeof status);
    if (status !== "CANCELLED" && status !== "ACCEPTED" && status !== "FINISHED")
        return next(new AppError("Invalid status entered", 500));
    switch (status) {
        case "CANCELLED(DRIVER)":
            await order.update({ driverId: null, status: "WAITING" })
            break;
        case "ACCEPTED":
            sendNotification(user.fcmToken, "Ваш заказ принят", `${req.user.username} принял ваш заказ. Если хотите звоните ${req.user.phone}`)
            await order.update({ status: status, accepted_time: new Date(), isAvailable: false })
            break;
        case "FINISHED":
            await order.update({ status: status, ended_time: new Date(), isAvailable: true })
        default:
            await order.update({ status: status });
            break;
    }
    return res.status(200).send(order);
})