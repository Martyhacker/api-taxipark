const router = require("express").Router();
const {
    autoLogin,
    login,
    protect,
    updateMe
} = require("../../controllers/admin/admin.controller")
router.post("/login", login);
router.patch("/profile", protect, updateMe);
router.post("/auto-login", autoLogin);
router.use("/users", protect, require("./routes/user.routes"));
router.use("/drivers",protect, require("./routes/driver.routes"));
router.use("/orders", protect,require("./routes/order.routes"));
router.use("/about-us", protect,require("./routes/about.routes"));
router.use("/statistics", protect, require("./routes/statistics.routes"));
router.use("/map", protect, require("./routes/map.routes"));
module.exports = router;