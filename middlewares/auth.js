const { getUser } = require("../service/auth.js");

function checkForAuthentication(req, res, next) {
  const authorizatinoHeaderValue = req.headers["authorization"];
  req.user = null;
  if (
    !authorizatinoHeaderValue ||
    !authorizatinoHeaderValue.startsWith("Bearer ")
  ) {
    return next();
  }

  const token = authorizatinoHeaderValue.split(" ")[1];
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.roles)) {
      return res.end("Unauthorized");
    }

    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
