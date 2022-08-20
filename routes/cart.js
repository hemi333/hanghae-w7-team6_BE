const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middlewares")


const {
    getCart,
    postCart,
    deleteCart,
} = require("../controllers/cart.controller");
const { route } = require('./product');

router.route("/", authMiddleware).get(getCart);
router.route("/:productId", authMiddleware).post(postCart).delete(deleteCart);

module.exports = router;