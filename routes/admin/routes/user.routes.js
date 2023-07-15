const r = require("express").Router();
const {
    getAllUsers,
    getUserByID,
    updateUser,
    updateUserPassword
} = require("../../../controllers/admin/user.controller")
r.get("/", getAllUsers);
r.get("/:id", getUserByID);
r.patch("/:id", updateUser);
r.patch("/pass/:id", updateUserPassword);
module.exports = r;