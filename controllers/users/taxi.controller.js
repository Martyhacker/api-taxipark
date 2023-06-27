const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const {Driver} = require("../../models")

exports.getTaxis = catchAsync(async (req,res,next)=>{
    const {count, rows} = await Driver.findAndCountAll();
    return res.status(200).json({count, data: rows});
})