const r = require("express").Router();
const {
    getAllOrders,
    getOrderByID,
    updateOrder,
} = require("../../../controllers/admin/order.controller");
r.get("/",getAllOrders);
r.get("/:id",getOrderByID);
r.patch("/:id", updateOrder);
module.exports = r;