const axios = require('axios')
const { API_URL,API_KEY,SOURCE } = require('../config/api')
const { db } = require("../models")
const Page = db.pages
const { Op, where } = require("sequelize")
const sequelize = require("sequelize")
var ejs = require("ejs")
var fs = require("fs")
var mailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const e = require("express")
const date = new Date()
const Razorpay = require('razorpay')
var configConstant = require("../config/constant")
var smtpTransport = mailer.createTransport({
  host: configConstant.SMTP_HOST,
  port: configConstant.SMTP_PORT,
  secure: false,
  auth: {
    user: configConstant.SMTP_USER,
    pass: configConstant.SMTP_PASS,
  },
});
const gurl = configConstant.uriUrl;

const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: configConstant.mySqlHost,
  user: configConstant.mySqlUser,
  password: configConstant.mySqlPassword,
  database: configConstant.mySqlDbName,
})

const dashboard = (req, res) => {
    let pageTitle   = 'Dashboard'
    return res.render('pages/dashboard',{
            pageTitle
    })
}

const pageDetails = (req, res) => {
    Page.findOne({
        where: {
            id: req.body.id
        }
    }).then(data => {
        res.send(data)
    })
}

const storePage = (req, res) => {
    console.log(req.body)
    // Page.update({
    //     descr
    // })
}

module.exports = {
    dashboard,
    pageDetails,
    storePage,
}
