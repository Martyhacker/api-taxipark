const router = require("express").Router();
const {findRoute, findPointByCoordinate} = require("../../../controllers/users/route.controller");
router.post("/point", findPointByCoordinate);
router.post("/path", findRoute);
module.exports = router;