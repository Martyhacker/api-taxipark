const r = require("express").Router();
const {
    getMyOrders,
    updateMyOrder,
    changeOrderStatus
} = require("../../../controllers/drivers/order.controller");
r.get("/",getMyOrders);
r.patch("/:id", updateMyOrder);
r.post("/status/:id", changeOrderStatus);
module.exports = r;
