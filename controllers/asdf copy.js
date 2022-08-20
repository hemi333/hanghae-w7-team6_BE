const nodemailer = require("nodemailer");
require("dotenv").config();

var generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

const authNumber = generateRandom(111111, 999999);


const main = async (req, res) => {
  const { email } = req.body;
//   console.log(email)
  let transporter = nodemailer.createTransport({
    service: "naver",
	host: 'smtp.naver.com',  // SMTP 서버명
	port: 465,  // SMTP 포트
    //   secure: false,
    auth: {
      user: 'dyswns22@naver.com',
      pass: '서우혁123!',
    //   user: process.env.MY_EMAIL,
    //   pass: process.env.MY_EMAIL_PW,
      // user: process.env.NODEMAILER_USER,// 보낼 이메일 주소
      // pass: process.env.NODEMAILER_PASS,// 이메일 비밀번호
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: `"6조" <${process.env.NODEMAILER_USER}>`, //보내는 곳 이름 과 보내는 메일 주소
    from: 'dyswns22@naver.com',
    // from: `"6조" <${process.env.NODEMAILER_USER}>`, //보내는 곳 이름 과 보내는 메일 주소
    to: email, //받는 사람의 메일주소
    subject: "메일 제목이 맞나요?", //메일 제목
    text: authNumber, //text로 작성된 내용
    html: `<b>${authNumber}</b>`, //html로 작성된내용
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Sent Auth Email",
  });
};


// main().catch(console.error);

module.exports = { main };
