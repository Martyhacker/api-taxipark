const r = require("express").Router();
const {getAllDrivers} = require("../../../controllers/admin/map.controller");
r.get("/drivers", getAllDrivers);
module.exports = r;