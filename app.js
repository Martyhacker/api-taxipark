const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AppError = require("./utils/appError");
const app = express();
const { Server } = require("socket.io");
const { createServer } = require("http");
const jwt = require("jsonwebtoken");
const {Driver} = require("./models")


app.use(require("helmet")());
const limiter = require("express-rate-limit")({
  max: 1000,
  windowMs: 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use(
  cors()
);

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// })

// io.use((socket, next) => {
//   if (socket.handshake.headers.authorization) {
//     const { authorization } = socket.handshake.headers.authorization;
//     const token = authorization.split(" ")[1];
//     jwt.verify(token, process.env.BCRYPT_SECRET, async (err, decoded) => {
//       if (err) {
//         throw new AppError("Invalid token supplied", 401);
//       }
//       const driver = await Driver.findOne({ where: { id: decoded.id } });
//       if (!driver) {
//         throw new AppError("driver not found", 404);
//       }
//       socket.driver = driver;
//       return next();
//     })
//   }else{
//     throw new AppError("Auth error!");
//   }
// })

// io.on("connection", onConnection(io));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

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
// app.use("/public", require("./routes/public/publicRouter"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(require("./controllers/error.controller"));

module.exports = app;