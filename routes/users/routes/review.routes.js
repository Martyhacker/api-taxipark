const r = require("express").Router();
const {reviewDriver} = require("../../../controllers/users/review.controller");
r.post("/driver/:id", reviewDriver);
module.exports = r;