const { User } = require("../models");

class UserRepository {
  //회원가입 데이터 저장 API
  createUser = async (userId, nickName, password, email, address) => {
    const user = await User.create({
      userId,
      nickName,
      password,
      email,
      address,
    });
    return user;
  };

  //로그인 API
  checkUserData = async (userId) => {
    const user = await User.findOne({ where: { userId: userId } });
    return user;
  };

  //중복확인 API
  doubleCheckUserId = async (value) => {
    const user = await User.findOne({ where: { userId: value } });
    return user;
  };

  //중복확인 API
  doubleCheckNickname = async (value) => {
    const user = await User.findOne({ where: { email: value } });
    return user;
  };
}

module.exports = UserRepository;


//