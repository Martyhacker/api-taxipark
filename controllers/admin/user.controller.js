const {User} = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
exports.getAllUsers = catchAsync(async (req,res,next)=>{
    const limit = req.query.limit || 20;
    const offset = req.query.offset;

    const {count, rows} = await User.findAndCountAll({limit, offset, attributes: {exclude : ["createdAt", "updatedAt"]}});
    return res.status(200).json({count, rows});
})