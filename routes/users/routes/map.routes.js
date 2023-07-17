const r = require("express").Router();
const {getAllDrivers} = require("../../../controllers/users/map.controller");
r.get("/drivers", getAllDrivers);
module.exports = r;