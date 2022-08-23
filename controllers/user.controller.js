const UserServcice = require("../services/user.service");
require("dotenv").config();

class UserController {
  userServcice = new UserServcice();

  //회원가입 API=====================ok
  join = async (req, res) => {
    try {
      const { userId, nickName, password, email, address } = req.body;
      const CheckAndJoinData = await this.userServcice.joinUser(
        userId,
        nickName,
        password,
        email,
        address
      );
      res.json(CheckAndJoinData);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        errorMessage: "회원가입 오류",
      });
    }
  };

  //로그인 API========================ok
  login = async (req, res) => {
    try {
      const { userId, password } = req.body;
      const userdata = await this.userServcice.loginUser(userId, password);
      res.json(userdata);
    } catch (err) {
      console.error(err);
      res.status(400).json({
        errorMessage: "로그인 오류",
      });
    }
  };

  //중복체크 API========================ok
  doubleCheck = async (req, res) => {
    try {
      const { key, value } = req.body;
      const isUserIdOrEmail = await this.userServcice.UserIdOrEmailcheck(
        key,
        value
      );
      res.json(isUserIdOrEmail);
    } catch (err) {
      res.status(400).json({
        errorMessage: "중복체크 오류",
      });
    }
  };

  //이메일 인증 API========================
}

module.exports = UserController;
