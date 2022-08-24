const jwt = require("jsonwebtoken");

class GenerateToken {
  generateToken = async (payload, secretkey, expires) => {
    const token = jwt.sign(payload, secretkey, { expiresIn: expires });
    return token;
  };
}

module.exports = GenerateToken;
