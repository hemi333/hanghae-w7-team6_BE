const nodeMailer = require("nodemailer");
require("dotenv").config();

var generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

const main = async (req, res) => {
  const number = generateRandom(111111, 999999);
  const { email } = req.body;
  const transporter = nodeMailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    auth: {
      user: `${process.env.MY_EMAIL_ID}`,
      pass: `${process.env.MY_EMAIL_PW}`,
    },
  });

  const option = {
    from: `${process.env.MY_EMAIL}`,
    to: email,
    subject: "마켓 컬리 가입인증 메일",
    text: "오른쪽 숫자 6자리를 입력해주세요 : " + number,
  };

  const info = await transporter.sendMail(option);
  console.log("Message sent: %s", info.messageId);

  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Sent Auth Email",
    html: "<b>Hello world?</b>", // html body
  });
};

module.exports = { main };
