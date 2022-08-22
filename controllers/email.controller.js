const nodeMailer = require("nodemailer");
require("dotenv").config();

let authnumber = [];

//인증 메일 전송====================================================================
const sendAuthMail = async (req, res) => {
  const { email } = req.body;
  try {
    const generateRandom = function (min, max) {
      const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return ranNum;
    };
    const number = generateRandom(
      parseInt(process.env.SECRET_NUM1),
      parseInt(process.env.SECRET_NUM2)
    );

    authnumber.push(number);
    console.log(authnumber);

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
      message: "인증이메일 발송완료",
    });
  } catch (err) {
    console.error(err),
      res.status(401).json({
        success: false,
        message: "이메일 인증 오류 발생",
      });
  }
};

//인증 번호 확인====================================================================

const authEmailNumberCheck = async (req, res) => {
  const { authEmailNumber } = req.body;
  try {
    console.log(authnumber);
    console.log(authEmailNumber);
    if (authnumber.includes(authEmailNumber)) {
      res.status(200).json({
        success: true,
        message: "인증번호가 일치합니다.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "인증번호가 불일치 합니다.",
      });
    }
  } catch (err) {
    console.error(err),
      res.status(401).json({
        success: false,
        message: "이메일 인증 오류 발생",
      });
  }
};

module.exports = { sendAuthMail, authEmailNumberCheck };
