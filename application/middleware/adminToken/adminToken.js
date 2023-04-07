const jwt = require('jsonwebtoken');
//Define a jwt secret key
const jwtsecret = require('../../config/constant').jwtsecret;
/**
 * function used for validate token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isValidToken(req, res, next) {
    //const token = req.cookies.token;
    const token = req.headers['token'];
    if (token) {
        // @ts-ignore
        jwt.verify(token, jwtsecret, function (err, payload) {
            if (err) {
                res.forbidden();
            } else {
                // const newToken = jwt.sign({ id: payload.id, type: payload.type }, jwtsecret, {
                //     expiresIn: 3600 // expires in 1 hour
                // });
                // req.adminUserId = payload.id;
                // res.cookie('token', newToken);
                next();
            }
        });
    } else {
        res.forbidden();
    }
}

module.exports = isValidToken;