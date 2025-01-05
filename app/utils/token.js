const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      photo: user.photo,
      role: user.role,
    },
    process.env.TOKEN,
    { expiresIn: process.env.TOKEN_EXPERIATION }
  );

  return token;
};

module.exports = generateToken;
