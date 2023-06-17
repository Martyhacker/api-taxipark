const jwt = require("jsonwebtoken");

const signToken = (id) => {
  console.log(process.env.BCRYPT_SECRET);
  return jwt.sign({ id }, process.env.BCRYPT_SECRET, {
    expiresIn: "24h",
  });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    // secure: true,
    httpOnly: true,
  });

  user.password = undefined;

  return res.status(statusCode).json({ token });
};