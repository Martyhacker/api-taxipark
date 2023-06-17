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
module.exports = router;