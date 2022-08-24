//nodemailer 불러오기
const nodeMailer = require("nodemailer");
require("dotenv").config();

let authnumberTemSave = []; //인증번호 임시저장
let useridTemSave = []; //유저아이디 임시저장

//인증 메일 전송====================================================================
const sendAuthMail = async (req, res) => {
  const { email, userId } = req.body;
  try {
    //랜덤 6자기 인증번호 생성
    const generateRandom = function (min, max) {
      const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return ranNum;
    };
    const number = generateRandom(
      parseInt(process.env.SECRET_NUM1),
      parseInt(process.env.SECRET_NUM2)
    );

    authnumberTemSave.unshift(number);
    useridTemSave.unshift(userId);
    console.log(authnumber);
    console.log(withUserid);

    const transporter = nodeMailer.createTransport({
      //어떤서비스이용(여기선 네이버)
      service: "naver", //서비스
      host: "smtp.naver.com", //SMTP입력
      port: 587, //SMTP HOST 입력
      auth: {
        user: `${process.env.MY_EMAIL_ID}`, //네이버 아이디(@naver.com뺴고)
        pass: `${process.env.MY_EMAIL_PW}`, //네이버 비번
      },
    });

    const option = {
      from: `"마켓 컬리 가입인증"${process.env.MY_EMAIL}`, //메일 보내는 사람
      to: email, //받는 사람 이메일
      subject: "마켓 컬리 가입인증 메일", //메일제목
      text: "오른쪽 숫자 6자리를 입력해주세요 : " + number, //메일내용
    };

    const info = await transporter.sendMail(option);
    console.log("Message sent: %s", info.messageId);

    res.status(200).json({
      success: true,
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
  const { authEmailNumber, userId } = req.body;
  try {
    console.log(authnumberTemSave);
    console.log(useridTemSave);
    console.log(authEmailNumber);
    
    const emailIndex = authnumberTemSave.indexOf(authEmailNumber);
    const useridIndex = useridTemSave.indexOf(userId);
    if ((emailIndex === useridIndex && emailIndex, useridIndex !== -1)) {
      delete authnumber[emailIndex];
      delete withUserid[useridIndex];
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
