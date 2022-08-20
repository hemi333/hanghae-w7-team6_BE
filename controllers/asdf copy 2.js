const nodeMailer = require("nodemailer");
require("dotenv").config();

const main = async (res, req) => {
    const { email } = req.body;
    console.log(email);
  const transporter = nodeMailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    auth: {
      user: `${process.env.MY_EMAIL}`,
      pass: `${process.env.MY_EMAIL_PW}`,
    },
  });



  const option = {
    from: `"devmemory" <${process.env.MY_EMAIL}>`,
    to: email,
    subject: "메일 제목이 맞나요?",
    text: "authNumber",
  };

  const info = await transporter.sendMail(option);
  console.log("Message sent: %s", info.messageId);

  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Sent Auth Email",
  });
};

// const validation = (data) => {
//   return (
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//       data.email
//     ) &&
//     data.title != undefined &&
//     data.message != undefined
//   );
// };

module.exports = { main };
