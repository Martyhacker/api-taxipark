const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { Admin } = require("../../models");
require("dotenv").config();
const signToken = (id) => {
  return jwt.sign({ id }, process.env.BCRYPT_SECRET, {
    expiresIn: "24h",
  });
};

const createSendToken = (admin, statusCode, res) => {
  const token = signToken(admin.id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.status(statusCode).json({
    token
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new AppError("provide username and password", 400));

  const admin = await Admin.findOne({ where: { username } });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return next(new AppError("Incorrect username or password", 401));
  }

  createSendToken(admin, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged as an Admin", 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.BCRYPT_SECRET);

  const freshAdmin = await Admin.findOne({
    where: { id: decoded.id },
  });

  if (!freshAdmin) {
    return next(
      new AppError("The user belonging to this token is no longer exists", 401)
    );
  }

  req.admin = freshAdmin;
  next();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { username, password, newPassword } = req.body;

  if (!username)
    return next(new AppError("Please provide username and password", 400));

  const admin = await Admin.findOne();

  if (password && newPassword) {
    if (!(await bcrypt.compare(password, admin.password)))
      return next(new AppError("Your current password is not correct", 401));

    admin.update({
      password: await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUND)),
    });

    admin.update({username});

    createSendToken(admin, 200, res);
  }
});


exports.autoLogin = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  let decoded = jwt.decode(token);

  createSendToken({ id: decoded.id }, 200, res);
});