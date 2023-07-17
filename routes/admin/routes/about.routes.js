const r= require("express").Router();
const {editAboutUs, getAboutUs} = require("../../../controllers/admin/about.controller");
r.get("/",getAboutUs);
r.patch("/",editAboutUs);
module.exports = r;