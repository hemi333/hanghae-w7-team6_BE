const express = require('express');
const router = express.Router();
const {
    getCart,
    postCart,
    deleteCart,
} = require("../controllers/cart.controller");
const { route } = require('./product');

router.route("/").get(getCart);
router.route("/:productId").post(postCart).delete(deleteCart);

module.exports = router;