const express = require("express");
const router = express.Router();
// const passport = require("passport");
const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/join", userController.join);
router.post("/login", userController.login);
router.post("/auth", userController.doubleCheck);


router.post("/email", main);


module.exports = router;

