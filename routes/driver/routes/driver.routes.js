const r = require("express").Router();
const {
    updateDriver,
    getProfile
} = require("../../../controllers/drivers/driver.controller");
r.get("/", getProfile);
r.patch("/", updateDriver);
module.exports = r;