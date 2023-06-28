const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Order } = require("../../models");
exports.getMyOrders = catchAsync(async (req, res, next) => {
    const { count, rows } = await Order.findAndCountAll({
        where: { driverId: req.user.id }
    })
    return res.status(200).json({ count, data: rows });
});
exports.updateMyOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findOne({ where: { id: req.params.id } });
    if (!order)
        return next(new AppError("This order not found", 404));
    await order.update(req.body);
    return res.status(200).send(order);
});

exports.changeOrderStatus = catchAsync(async (req, res, next) => {
    const order = await Order.findOne({ where: { id: req.params.id } });
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
        case "CANCELLED":
            await order.update({ driverId: null, status: "WAITING" })
            break;
        case "ACCEPTED":
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