const r= require("express").Router();
const {getStatistics} = require("../../../controllers/admin/statistics.controller");
r.get("/", getStatistics);
module.exports = r;