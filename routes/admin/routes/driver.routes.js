const router = require("express").Router();
const {addDriver,getAllDrivers,updateDriver} = require("../../../controllers/admin/driver.controller");
router.get("/", getAllDrivers);
router.post("/add", addDriver);
router.patch("/:id",updateDriver);
module.exports = router;