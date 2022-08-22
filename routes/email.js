const express = require("express");
const router = express.Router();
const {
  sendAuthMail,
  authEmailNumberCheck,
} = require("../controllers/email.controller");

router.post("/", sendAuthMail);
router.post("/auth", authEmailNumberCheck);

module.exports = router;
