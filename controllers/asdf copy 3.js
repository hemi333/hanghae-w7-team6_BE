const nodeMailer = require("nodemailer");
require("dotenv").config();

const main = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const transporter = nodeMailer.createTransport({
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
    // html: "<b>Hello world?</b>",
  };

  await transporter.sendMail(option, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      return info.response;
    }
  });


  res.status(200).json({
    status: "Success",
    code: 200,
    message: "Sent Auth Email",
  });
};

module.exports = { main };
