const router = require("express").Router();
const {findRoute} = require("../../../controllers/users/route.controller")
router.post("/", findRoute);
module.exports = router;