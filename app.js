const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const app = express();


app.use(require("helmet")());
const limiter = require("express-rate-limit")({
  max: 1000,
  windowMs: 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use(
  cors()
);

app.use(require("morgan")("dev"));
app.use(require("cookie-parser")());
app.use("/", limiter);
// app.use(express.json({ limit: "50mb" }));
app.use(require("xss-clean")());
app.use("/public", express.static(`public`));

// BODY PARSER
app.use(express.json({ limit: "600mb" }));
app.use(express.urlencoded({ extended: true, limit: "600mb" }));

// ROUTES
app.use("/users", require("./routes/users/user.router"));
app.use("/admin", require("./routes/admin/admin.router"));
app.use("/drivers", require("./routes/driver/driver.router"));
// app.use("/public", require("./routes/public/publicRouter"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(require("./controllers/error.controller"));

module.exports = app;