const router = require("express").Router();
const {
    login,
    protect,
    signup
} = require("../../controllers/users/auth.controller")

router.post("/login", login);
router.post("/register",signup);
router.use("/routes", require("./routes/route.routes"));
module.exports = router;