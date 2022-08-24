const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const wrapAsyncController = require("../middlewares/wrapAsyncControllter");//비동기 함수 오류 next하는 미들웨어

const userController = new UserController();

router.post("/join", wrapAsyncController(userController.join));
router.post("/login", wrapAsyncController(userController.login));
router.post("/auth", wrapAsyncController(userController.doubleCheck));


module.exports = router;

