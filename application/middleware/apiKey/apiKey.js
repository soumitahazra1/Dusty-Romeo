var APIKEY = require('../../config/constant').apiKey;
/**
 * used for validate api key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isValidApiKey(req, res, next) {
    //Check source from swagger or not
    var source = req.headers['source'];
    if (source == "nutrabbit") {
        next();
    } else {
        var apiKey = req.headers['apikey'];
        if (apiKey == APIKEY) {
            next();
        } else {
            res.forbidden();
        }
    }
}
module.exports = isValidApiKey;