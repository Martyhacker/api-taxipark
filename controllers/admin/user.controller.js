const {User} = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { user_search } = require("../../utils/search_body");
require("dotenv").config();

exports.getAllUsers = catchAsync(async (req,res,next)=>{
    const {offset, keyword} = req.query;
    const limit = req.query.limit || 20;
    var where = {};
    if(keyword) where = user_search(keyword);
    const {count, rows} = await User.findAndCountAll({
        where,
        limit, offset, attributes: {exclude : ["updatedAt", "password", "fcmToken"]}});
    return res.status(200).json({count, data:rows});
});
exports.getUserByID = catchAsync(async(req,res,next)=>{
    const user = await User.findOne({where: {id: req.params.id}});
    if(!user)
        return next(new AppError("User not found", 404));
    return res.status(200).send(user);
});
exports.updateUser = catchAsync(async(req,res,next)=>{
    const {username, phone} = req.body;
    const user = await User.findOne({where: {id: req.params.id}});
    if(!user)
        return next(new AppError("User not found", 404));
    await user.update({username, phone});
    return res.status(200).send(user);
});
exports.updateUserPassword = catchAsync(async(req,res,next)=>{
    var {password} = req.body;
    const user = await User.findOne({where: {id: req.params.id}});
    if(!user)
        return next(new AppError("User not found", 404));
    await user.update({password: await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUND))});
    return res.status(200).send(user);
})