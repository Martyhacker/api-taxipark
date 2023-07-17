const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Driver, User, Order } = require("../../models/");
const { Op } = require("sequelize");
exports.getAllDrivers = catchAsync(async (req,res,next)=>{
    const {count, rows} = await Driver.findAndCountAll({
        attributes: {exclude: ["createdAt", "updatedAt", "password", "fcmToken"]},
        where: {
            lat: {
                [Op.ne]: null
            },
            lng: {
                [Op.ne]: null
            },
        }
    });
    return res.status(200).json({count, data: rows});
})