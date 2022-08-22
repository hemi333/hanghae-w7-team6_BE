const UserRepository = require("../repositories/user.repositories");
const GenerateToken = require("../middlewares/generate_token");
const regexUserId = /^[a-zA-Z0-9]{4,8}$/;
const regexNickName = /^[가-힣a-zA-Z]{4,8}$/;
const regexPassword = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
const regexEmail = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;

class UserServcice {
  userRepository = new UserRepository();
  generateToken = new GenerateToken();

  // 회원가입데이터 확인 및 저장 API
  joinUser = async (userId, nickName, password, email, address) => {
    const UserIdcheck = regexUserId.test(userId);
    const NickNamecheck = regexNickName.test(nickName);
    const Passwordcheck = regexPassword.test(password);
    const Emailcheck = regexEmail.test(email);
    if (!UserIdcheck || !NickNamecheck || !Passwordcheck || !Emailcheck) {
      console.log(NickNamecheck);
      return {
        success: false,
        errorMessage: "형식이 맞지 않습니다.",
      };
    } else {
      await this.userRepository.createUser(
        userId,
        nickName,
        password,
        email,
        address
      );
      return {
        success: true,
        message: "success",
      };
    }
  };

  //로그인 API
  loginUser = async (userId, password) => {
    const userData = await this.userRepository.checkUserData(userId, password);
    if (!userData || userData.password !== password) {
      return {
        success: false,
        errorMessage: "아이디 또는 비번이 잘못 입력되었습니다.",
      };
    }
    const payload = {
      userId: userData.userId,
      nickName: userData.nickName,
      email: userData.email,
      address: userData.address,
    };
    const token = await this.generateToken.generateToken(
      payload,
      process.env.MYSECRET_KEY,
      "2d"
    );
    return {
      token,
    };
  };

  //중복확인 API
  UserIdOrEmailcheck = async (key, value) => {
    let checkUserId;
    let checkEmail;

    if (key == "userId") {
      checkUserId = await this.userRepository.doubleCheckUserId(value);
      const UserIdcheck = regexUserId.test(value);
      if (!UserIdcheck) {
        return { success: false, errorMessage: "형식이 맞지 않습니다." };
      }
      if (!checkUserId) {
        return { success: true, Message: "사용 가능한 아이디 입니다." };
      } else {
        return { success: false, errorMessage: "중복된 아이디 입니다." };
      }
    }
    if (key == "email") {
      checkEmail = await this.userRepository.doubleCheckNickname(value);
      const Emailcheck = regexEmail.test(value);
      if (!Emailcheck) {
        return { success: false, errorMessage: "형식이 맞지 않습니다." };
      }
      if (!checkEmail) {
        return { success: true, Message: "사용 가능한 이메일 입니다." };
      } else {
        return { success: false, errorMessage: "중복된 이메일 입니다." };
      }
    }
  };
}

module.exports = UserServcice;
