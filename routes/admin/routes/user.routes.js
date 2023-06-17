const router = require("express").Router();
const {
    getAllUsers
} = require("../../../controllers/admin/user.controller")
router.get("/", getAllUsers);
module.exports = router;