const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/join", userController.join);
router.post("/login",  userController.login);
router.post("/auth", userController.doubleCheck);

module.exports = router;
