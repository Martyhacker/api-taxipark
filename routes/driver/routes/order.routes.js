const r = require("express").Router();
const {
    getMyOrders,
    updateMyOrder,
    myOrderStatus
} = require("../../../controllers/drivers/order.controller");
r.get("/",getMyOrders);
r.patch("/:id", updateMyOrder);
r.post("/status/:id", myOrderStatus);
module.exports = r;
