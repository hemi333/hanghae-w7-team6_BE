const nodeMailer = require("nodemailer");
require("dotenv").config();


const main = async (req, res) => {
  const transporter = nodeMailer.createTransport({
    // service: "naver",
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "b3c0106674759a",
      pass: "2b6549307400b7",
    },
  });

  const option = {
    from: "dyswns22@naver.com",
    to: "dyswns22@naver.com",
    subject: "Hello",
    text: "Hello world?",
  };

  const info = await transporter.sendMail(option);

  res.status(200).json({
    info
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
