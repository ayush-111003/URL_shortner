const jwt = require("jsonwebtoken");
const secret = "Piyush$123@$";

function setUser(user) {
  // console.log("User found:", user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
