const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.send("Router page");
});

module.exports = indexRouter;
