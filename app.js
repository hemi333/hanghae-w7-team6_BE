const express = require("express");
const app = express();

const Http = require("http");
// const Https = require("https");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes");
const ErrorHandler = require("./advice/ErrorHandler");

//로그 관리를 위해 morgan 설치
const morgan = require("morgan");
app.use(morgan("dev"));

//보안과 가독성을 위해 환경변수사용
require("dotenv").config();

const http = Http.createServer(app);
// const https = Https.createServer(options, app);

const http_port = process.env.HTTP_PORT || 3000;
// const https_port = process.env.HTTPS_PORT || 443;

// const port = process.env.Port;

const cors = require("cors");
const corsOption = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", indexRouter);

app.use(ErrorHandler);


http.listen(http_port, () => {
  console.log(`🟢 ${http_port} 포트로 서버가 열렸어요!`);
});

// https.listen(https_port, () => {
//   console.log(`Start listen Server: ${https_port}`);
// });
