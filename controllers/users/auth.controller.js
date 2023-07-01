const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { User, Order } = require("../../models");
const { createSendToken } = require("./../../utils/createSendToken");
require("dotenv").config();
exports.signup = catchAsync(async (req, res, next) => {
  const { username, phone, address, password } = req.body;
  let found = await User.findOne({ where: { phone } });
  
  if (found) {
    return res.json({ code: 1, msg: "user already registered" });
  }
  const newUser = await User.create({username, phone, address, password});

  createSendToken(newUser, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("You are not logged as an User", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.BCRYPT_SECRET);
  const freshUser = await User.findOne({ where: { id: [decoded.id] } });

  if (!freshUser) return next(new AppError("Not found", 401));

  req.user = freshUser;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  const user = await User.findOne({ where: { phone } });
  if (!user) {
    return res.status(501).json({ code: 2, mess: "bular yalak ulanyjy yok" });
  }
  // const { phone, newPassword } = req.body;

  // const user = await Users.findOne({ where: { phone } });

  // if (!user) {
  //   return res.status(501).json({ code: 2, mess: "bular yalak ulanyjy yok" });
  // }

  // console.log("user", user);
  // // user.password = await bcrypt.hash(newPassword, 12);
  // // await user.save();

  // // createSendToken(user, 200, res);


  // const verified = await verify_phone(phone);

  // // console.log("verified: ", verified);

  // if (verified) {
  //   // const newUser = await Users.create(req.body);
  //   user.password = await bcrypt.hash(newPassword, 12);
  //   await user.save();

  //   return createSendToken(user, 201, res);
  // }

  // throw new Error("My friend it is impossible");
});

exports.login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new AppError("Please provide phone and password", 400));
  }

  const user = await User.findOne({ where: { phone } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect phone number or password", 401));
  }
  createSendToken(user, 200, res);
});

exports.profile = catchAsync(async(req,res,next)=>{
  return res.status(200).send(req.user);
})
exports.updatePassword = catchAsync(async(req,res,next)=>{
  const user = await User.findOne({where: {id: req.user.id}});
  const {currentPassword, newPassword} = req.body;
  if(!currentPassword || !newPassword)
    return next(new AppError("Provide currentPassword and newPassword", 400));
  if(!(await bcrypt.compare(currentPassword, user.password)))
    return next(new AppError("Current Password is incorrect",401));
  
  user.password = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUND));
  await user.save();
  createSendToken(user, 200, res);
})
exports.updateProfile = catchAsync(async (req,res,next)=>{
  const user = await User.findOne({where: {id: req.user.id}});
  const {username, address} = req.body;
  await user.update({username, address});
  return res.status(200).send(user);
});
exports.updateFcm = catchAsync(async(req,res,next)=>{
  const user = await User.findOne({where: {id: req.user.id}});
  const {fcmToken} = req.body;
  await user.update({fcmToken});
  return res.status(200).send(user);
});
exports.deleteMe = catchAsync(async(req,res,next)=>{
  const orders = await Order.findAll({where: {userId: req.user.id}});
  await User.destroy({where: {phone: req.user.phone}});
  return res.status(200).json({msg: "Deleted"});
})