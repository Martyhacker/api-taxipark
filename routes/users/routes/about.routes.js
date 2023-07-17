const r = require("express").Router();
const{getAboutUs} = require("../../../controllers/admin/about.controller");
r.get("/", getAboutUs);
module.exports = r;