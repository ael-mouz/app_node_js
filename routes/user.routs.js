const express = require("express");
const router_user = express.Router();
const userController = require("../controllers/user");

router_user.post("/login", userController.login);
router_user.post("/register", userController.register);
router_user.get("/secret", userController.secret);

module.exports = router_user;
