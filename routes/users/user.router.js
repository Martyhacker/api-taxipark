const router = require("express").Router();
const {
    login,
    protect,
    signup,
    profile,
    updateProfile,
    updateFcm,
    updatePassword,
    deleteMe
} = require("../../controllers/users/auth.controller")

router.get("/profile", protect, profile);
router.patch("/profile", protect, updateProfile);
router.patch("/fcm", protect, updateFcm);
router.patch("/profile/password", protect, updatePassword);
router.post("/delete", protect, deleteMe);
router.post("/login", login);
router.post("/register", signup);
router.use("/finder", protect, require("./routes/finder.routes"));
router.use("/taxis", protect, require("./routes/taxi.routes"));
router.use("/orders", protect, require("./routes/order.routes"));
router.use("/about-us", protect, require("./routes/about.routes"));
module.exports = router;