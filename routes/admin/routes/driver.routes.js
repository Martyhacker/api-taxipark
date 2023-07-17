const router = require("express").Router();
const {addDriver,getAllDrivers,updateDriver,changePassword,deleteDriver, getDriverByID} = require("../../../controllers/admin/driver.controller");
router.get("/", getAllDrivers);
router.get("/:id", getDriverByID);
router.post("/add", addDriver);
router.patch("/:id",updateDriver);
router.patch("/pass/:id",changePassword);
router.post("/delete/:id", deleteDriver);
module.exports = router;