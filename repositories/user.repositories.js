const { User } = require("../models");

class UserRepository {
  //회원가입 데이터 저장 API
  createUser = async (id, nickName, password, email, address) => {
    const user = await User.create({
      id,
      nickName,
      password,
      email,
      address,
    });
    return user;
  };

  //로그인 API
  checkUserData = async (id) => {
    const user = await User.findOne({ where: { id: id } });
    return user;
  };

  //중복확인 API
  doubleCheckUserId = async (value) => {
    const user = await User.findOne({ where: { id: value } });
    return user;
  };

  //중복확인 API
  doubleCheckNickname = async (value) => {
    const user = await User.findOne({ where: { email: value } });
    return user;
  };
}

module.exports = UserRepository;
