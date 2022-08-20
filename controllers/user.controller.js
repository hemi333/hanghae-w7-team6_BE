const UserServcice = require("../services/user.service");
const jwt = require("jsonwebtoken");
const GenerateToken = require("../middlewares/generate_token");
require("dotenv").config();

const regexUserId = /^[a-zA-Z0-9]{4,8}$/;
const regexNickName = /^[가-힣a-zA-Z]{4,8}$/;
const regexPassword = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
const regexEmail = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
// const { generateToken } = require("../middlewares/generate_token");

class UserController {
  userServcice = new UserServcice();
  generateToken = new GenerateToken();

  //회원가입 API=====================ok
  join = async (req, res) => {
    try {
      const { userId, nickName, password, email } = req.body;
      //로그인 데이터 형식 check

      const UserIdcheck = regexUserId.test(userId);
      const NickNamecheck = regexNickName.test(nickName);
      const Passwordcheck = regexPassword.test(password);
      const Emailcheck = regexEmail.test(email);

      if (!UserIdcheck || !NickNamecheck || !Passwordcheck || !Emailcheck) {
        return res.status(400).json({
          errorMessage: "형식이 맞지 않습니다.",
        });
      }
      await this.userServcice.joinUser(userId, nickName, password, email);
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: "회원가입 오류",
      });
    }
  };

  //로그인 API========================ok
  login = async (req, res) => {
    try {
      const { userId, password } = req.body;
      const userdata = await this.userServcice.loginUser(userId);

      if (!userdata || userdata.password !== password) {
        res.status(400).json({
          errorMessage: "아이디 또는 비번이 잘못 입력되었습니다.",
        });
        return;
      }

      const payload = {
        userId: userdata.userId,
        nickName: userdata.nickName,
        email: userdata.email,
      };

      const token = await this.generateToken.generateToken(
        payload,
        process.env.MYSECRET_KEY,
        "2d"
      );

      res.json({
        token,
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: "로그인 오류",
      });
    }
  };

  //중복체크 API========================ok
  doubleCheck = async (req, res) => {
    const { key, value } = req.body;

    let checkUserId;
    let checkEmail;

    try {
      if (key == "userId") {
        checkUserId = await this.userServcice.userIddoubleCheck(value);
        const UserIdcheck = regexUserId.test(value);
        if (!UserIdcheck) {
          return res.status(400).json({
            errorMessage: "형식이 맞지 않습니다.",
          });
        }
        if (!checkUserId) {
          return res.status(400).json({
            errorMessage: "사용 가능한 아이디 입니다.",
          });
        } else {
          return res.status(200).json({
            errorMessage: "중복된 아이디 입니다.",
          });
        }
      }
      if (key == "email") {
        checkEmail = await this.userServcice.emaildoubleCheck(value);
        const Emailcheck = regexEmail.test(value);
        if (!Emailcheck) {
          return res.status(400).json({
            errorMessage: "형식이 맞지 않습니다.",
          });
        }
        if (!checkEmail) {
          return res.status(400).json({
            errorMessage: "사용 가능한 이메일 입니다.",
          });
        } else {
          return res.status(200).json({
            errorMessage: "중복된 이메일 입니다.",
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        errorMessage: "중복체크 오류",
      });
    }
  };
}

module.exports = UserController;
