const jwt = require('jsonwebtoken');
//Define a jwt secret key
const jwtsecret = require('../../config/constant').jwtsecret;
/**
 * function used for validate token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkAccess(req, res, next) {
    //const token = req.cookies.token;
    const token = req.headers['token'];
    if (token) {
        jwt.verify(token, jwtsecret, function (err, payload) {
            if (err) {
                res.forbidden();
            } else {
                if (payload.type == "admin") {
                    next();
                } else {
                    res.forbidden();
                }
            }
        });
    } else {
        res.forbidden();
    }
}

module.exports = checkAccess;