const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middlewares");

const {
  getCart,
  postCart,
  deleteCart,
} = require("../controllers/cart.controller");
const { route } = require("./product");

router.route("/").get(authMiddleware,getCart);
router.route("/:productId").post(authMiddleware,postCart).delete(authMiddleware,deleteCart);


module.exports = router;
