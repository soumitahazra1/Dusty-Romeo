// const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  // authJwt,
  verifySignUp,
    "validateApiKey": require('./apiKey/apiKey'),
    "vaildateToken": require('./token/token'),
    "vaildateAdminToken": require('./adminToken/adminToken'),
    "checkAdminAccess": require('./adminAccess/adminAccess'),
};
