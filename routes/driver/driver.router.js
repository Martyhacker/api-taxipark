const r = require("express").Router();
const {
    login,
    protect,
    signup
} = require("../../controllers/drivers/auth.controller");
r.post("/login", login);
r.post("/register",signup);
r.use("/me", protect, require("./routes/driver.routes"));
r.use("/orders", protect, require("./routes/order.routes"));
module.exports = r;