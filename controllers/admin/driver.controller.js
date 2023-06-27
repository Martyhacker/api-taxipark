const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Driver, User } = require("../../models/")
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

exports.getAllDrivers = catchAsync(async (req, res, next) => {
    const limit = req.query.limit || 20;
    const {isAvaiable, isOnline, offset} = req.query;
    var where = {};
    if(isAvaiable) where.isAvailable = isAvaiable;
    if(isOnline) where.isOnline = isOnline;

    const { count, rows } = await Driver.findAndCountAll({
        limit,
        offset,
        attributes: {exclude: ["password", "fcmToken", "createdAt"]}
    });
    return res.status(200).json({ count, data: rows });
});
exports.updateDriver = catchAsync(async (req, res, next) => {
    const driver = await Driver.findOne({ where: { id: req.params.id } });
    if (!driver)
        return next(new AppError("This driver not found", 404));
    await driver.update(req.body);
    return res.status(200).send(driver);
});