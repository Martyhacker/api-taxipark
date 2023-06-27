const router = require("express").Router();
const {
    login,
    protect,
    signup
} = require("../../controllers/users/auth.controller")

router.post("/login", login);
router.post("/register",signup);
router.use("/finder", protect, require("./routes/finder.routes"));
router.use("/taxis", protect,  require("./routes/taxi.routes"));
router.use("/orders", protect, require("./routes/order.routes"));
module.exports = router;