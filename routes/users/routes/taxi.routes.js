const router = require("express").Router();
const {getTaxis} = require("../../../controllers/users/taxi.controller");
router.get("/", getTaxis);
module.exports = router;