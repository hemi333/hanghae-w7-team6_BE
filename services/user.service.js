const UserRepository = require("../repositories/user.repositories");

class UserServcice {
  userRepository = new UserRepository();

  //회원가입 데이터 저장 API
  joinUser = async (id, nickName, password, email, address) => {
    await this.userRepository.createUser(id, nickName, password, email, address);
    return;
  };
  //로그인 API
  loginUser = async (id) => {
    const userData = await this.userRepository.checkUserData(id);
    return userData;
  };
  //중복확인 API
  userIddoubleCheck = async (value) => {
    const userIdckeck = await this.userRepository.doubleCheckUserId(value);
    return userIdckeck;
  };

  emaildoubleCheck = async (value) => {
    const valuecheck = await this.userRepository.doubleCheckNickname(value);
    return valuecheck;
  };
}

module.exports = UserServcice;
