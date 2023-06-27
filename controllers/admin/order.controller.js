const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const {Order, User, Driver} = require("../../models/")
exports.getAllOrders = catchAsync(async(req,res,next)=>{
    const limit = req.query.limit || 20;
    const offset = req.query.offset;
    const attributes = {exclude: ["distance","driverId","userId", "counter_start_time", "time", "start_lat","start_lon","dest_lat","dest_lon", "accepted_time","ended_time"]};
    const {count, rows} = await Order.findAndCountAll({
        limit, offset, attributes
    });
    return res.status(200).json({count, data:rows});
});
exports.getOrderByID = catchAsync(async(req,res,next)=>{
    const order = await Order.findOne({where: {id: req.params.id}, include: [
        {model: User, as: "user", attributes: {exclude: ["createdAt", "updatedAt", "fcmToken", "password", "address"]}},
        {model: Driver, as: "driver", attributes: {exclude: ["createdAt", "updatedAt", "fcmToken", "password", "address"]}},
    ]});
    if(!order)
        return next(new AppError("This order not found", 404));
    return res.status(200).send(order);
});

exports.updateOrder = catchAsync(async(req,res,next)=>{
    const order = await Order.findOne({where: {id: req.params.id}});
    if(!order)
        return next(new AppError("This order not found",404));
    await order.update(req.body);
    return res.status(200).send(order);
})