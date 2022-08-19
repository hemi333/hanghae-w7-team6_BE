const express = require("express");
const cookieParser = require('cookie-parser');
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const port = process.env.Port;

app.use(express.json());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
