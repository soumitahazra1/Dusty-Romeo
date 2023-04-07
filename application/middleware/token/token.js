const jwt = require('jsonwebtoken')
const jwtsecret = require('../../config/constant').jwtsecret
const usersModel = require("../../models/index").user
var configConstant = require("../../config/constant")
const mysql = require("mysql2")
const date = new Date()
const conn = mysql.createConnection({
    host: configConstant.mySqlHost,
    user: configConstant.mySqlUser,
    password: configConstant.mySqlPassword,
    database: configConstant.mySqlDbName,
  })
/**
 * function used for validate token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isValidToken(req, res, next) {
    const Authorization = req.headers['authorization']
    const token = Authorization.split('Bearer ')[1]
    if (token) {
        jwt.verify(token, jwtsecret, function (err, payload) {
            if (err) {
                return res.status(500).send({ status: false, message: "Oops Sank! Something Went Terribly Wrong !" })
            } else {
                let time = date.getTime()
                if(payload.expireTime < time){
                    return res.status(440).send({ status: false, message: "Token Has Been Expired! Please Log In", "return": true })
                }else{
                    var sql = "SELECT `users`.* FROM `users` INNER JOIN `user_tokens` ON `users`.`id` = `user_tokens`.`user_id` WHERE `users`.`id` = "+payload.id+" AND `user_tokens`.`authorization_token` = '"+token+"' AND `user_tokens`.`device_type` = "+req.headers['device_type']
                    conn.query(sql,function (err,userData,fields1) {
                        if (userData.length < 1) {
                            return res.status(403).send({ status: false, message: "Invalid Token! Please Log In" })
                        } else {
                            if(userData.status == '0'){
                                return res.status(400).send({ status: false, message: "Account Inactive!" })
                            }
                            req.userId = payload.id
                            next()
                        }
                    })
                }
            }
        })
    } else {
        return res.status(401).send({ status: false, message: "Token Not Present In The Request !" })
    }
}

module.exports = isValidToken