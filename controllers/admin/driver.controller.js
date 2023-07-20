const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Driver, User, Order, Review } = require("../../models/");
const { driver_search } = require("../../utils/search_body");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.getAllDrivers = catchAsync(async (req, res, next) => {
    const limit = req.query.limit || 20;
    const { isAvaiable, isOnline, offset, keyword } = req.query;
    var where = {};
    if (isAvaiable) where.isAvailable = isAvaiable;
    if (isOnline) where.isOnline = isOnline;
    if (keyword) where = driver_search(keyword);
    const { count, rows } = await Driver.findAndCountAll({
        where,
        limit,
        offset,
        attributes: { exclude: ["password", "fcmToken", "createdAt"] }
    });
    return res.status(200).json({ count, data: rows });
});

exports.getDriverByID = catchAsync(async (req, res, next) => {
    const driver = await Driver.findOne({ where: { id: req.params.id } });
    if (!driver)
        return next(new AppError("This driver not found", 404));
    const {count, rows} = await Review.findAndCountAll({where: {driverId: driver.id}});
    var rating = 0;
    rows.forEach(element => {
        rating += element.point;
    });
    driver.setDataValue("rating", rating/count);
    return res.status(200).send(driver);
});
exports.addDriver = catchAsync(async (req, res, next) => {
    const { username, phone, password } = req.body;
    const found = await Driver.findOne({ where: { phone: phone } });
    const foundUser = await User.findOne({ where: { phone: phone } });
    if (found)
        return next(new AppError("Driver already exists", 403));
    if (foundUser)
        return next(new AppError("This is a user", 403));

    const driver = await Driver.create(req.body);
    return res.status(201).send(driver);
})

exports.updateDriver = catchAsync(async (req, res, next) => {
    const {username, phone} = req.body;
    const driver = await Driver.findOne({ where: { id: req.params.id } });
    if (!driver)
        return next(new AppError("This driver not found", 404));
    await driver.update({username, phone});
    return res.status(200).send(driver);
});

exports.changePassword = catchAsync(async (req, res, next) => {
    const { password } = req.body;
    console.log(req.body);
    const driver = await Driver.findOne({ where: { id: req.params.id } });
    if (!driver)
        return next(new AppError("This driver not found", 404));
    await driver.update({ password: await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUND)) });
    return res.status(200).send(driver);
});

exports.deleteDriver = catchAsync(async (req, res, next) => {
    const driver = await Driver.findOne({ where: { id: req.params.id } });
    if (!driver)
        return next(new AppError("This driver not found", 404));
    await Order.update({driverId: null}, {where: {driverId: driver.id}});
    await driver.destroy();
    return res.status(200).send({"msg":"Deleted"});
})