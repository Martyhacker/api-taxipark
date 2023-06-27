const r = require("express").Router();
const {
    addOrder,
    getAllOrders,
    getOrder
} = require("../../../controllers/users/order.controller");
r.post("/add", addOrder);
r.get("/", getAllOrders);
r.get("/:id",getOrder);
module.exports = r;