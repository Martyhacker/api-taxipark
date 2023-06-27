const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Driver } = require("../../models");
const { createSendToken } = require("./../../utils/createSendToken");
require("dotenv").config();
exports.signup = catchAsync(async (req, res, next) => {
  const { username, phone, password } = req.body;
  let found = await Driver.findOne({ where: { username } });
  
  if (found) {
    return res.json({ code: 1, msg: "user already registered" });
  }
  const newDriver = await Driver.create(req.body);

  createSendToken(newDriver, 201, res);
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
  const freshDriver = await Driver.findOne({ where: { id: [decoded.id] } });

  if (!freshDriver) return next(new AppError("Not found", 401));

  req.user = freshDriver;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  const driver = await Driver.findOne({ where: { phone } });
  if (!driver) {
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

  const user = await Driver.findOne({ where: { phone } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect phone  or password", 401));
  }
  createSendToken(user, 200, res);
});