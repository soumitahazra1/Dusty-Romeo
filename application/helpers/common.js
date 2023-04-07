const db = require("../models")
const { Op } = require("sequelize")
const sequelize = require("sequelize")
const { exit } = require("process")
const { menu } = require("../models")
const jwt = require("jsonwebtoken")
const jwtsecret = require("../config/constant").jwtsecret
const Psource = require("../config/constant").source
const Papi_key = require("../config/constant").apiKey
const date = new Date()
const bcrypt = require("bcryptjs")
const e = require("express")
var configConstant = require('../config/constant')
const customerUrl = configConstant.customerUrl


exports.dateToDayFormatter = function (date){
    var gsDayNames = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
      ]
      
      var d = new Date(date)
      var dayName = gsDayNames[d.getDay()]
      return dayName
}

exports.dateToTimeFormatter = function (date){
    return new Date(date).getHours().toString().padStart(2,'0')+":"+new Date(date).getMinutes().toString().padStart(2,'0')
}

exports.dateFormat = function(dateToBeFormatted){
    var date = new Date().getFullYear()+'-'+(new Date().getMonth() + 1).toString().padStart(2,'0')+'-'+new Date().getDate().toString().padStart(2,'0')
    
    if(dateToBeFormatted != ''){
        date = new Date(dateToBeFormatted).getFullYear()+'-'+(new Date(dateToBeFormatted).getMonth() + 1).toString().padStart(2,'0')+'-'+new Date(dateToBeFormatted).getDate().toString().padStart(2,'0')
    }
    return date
}

exports.fullDatetimeFormat = function (dateToBeFormatted){
    var date = new Date().getFullYear()+'-'+(new Date().getMonth() + 1).toString().padStart(2,'0')+'-'+new Date().getDate().toString().padStart(2,'0')+' '+new Date().getHours().toString().padStart(2,'0')+":"+new Date().getMinutes().toString().padStart(2,'0')+":"+new Date().getSeconds().toString().padStart(2,'0')
    
    if(dateToBeFormatted != ''){
        date = new Date(dateToBeFormatted).getFullYear()+'-'+(new Date(dateToBeFormatted).getMonth() + 1).toString().padStart(2,'0')+'-'+new Date(dateToBeFormatted).getDate().toString().padStart(2,'0')+' '+new Date(dateToBeFormatted).getHours().toString().padStart(2,'0')+":"+new Date(dateToBeFormatted).getMinutes().toString().padStart(2,'0')+":"+new Date(dateToBeFormatted).getSeconds().toString().padStart(2,'0')
    }
    return date
}

exports.dateFormatDDMMYYYY = function(dateToBeFormatted){
    var date = new Date().getDate().toString().padStart(2,'0')+'-'+(new Date().getMonth() + 1).toString().padStart(2,'0')+'-'+new Date().getFullYear()
    
    if(dateToBeFormatted!=''){
        date = new Date(dateToBeFormatted).getDate().toString().padStart(2,'0')+'-'+(new Date(dateToBeFormatted).getMonth() + 1).toString().padStart(2,'0')+'-'+new Date(dateToBeFormatted).getFullYear()
    }
    return date
}
exports.isValidApiKey = function(source, api_key) {
	if ((source == Psource) && (api_key == Papi_key)) {
		return true
	}else{
	    return false
    }
}
exports.uniformResponse = function(user, url) {
    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      country_code: user.country_code,
      role_id: user.role_id,
      address: user.address,
      country_id: user.country_id,
      city_id: user.city_id,
      state_id: user.state_id,
      country_name: user.country_name,
      state_name: user.state_name,
      city_name: user.city_name,
      pincode: user.pincode,
      status: user.status,
      dob: user.dob,
      blood_group:user.blood_group,
      profile_image:
        user.profile_image == "" || user.profile_image == null
          ? url + "/images/no-img.png"
          : url + "/uploads/" + user.profile_image
    }
  }

exports.createUserToken = function(user) {
    let time = date.getTime()
    var expiration_time = time + (100 * 3600 * 24 * 30 * 1000)
    var token = jwt.sign(
        {
            id: user.id,
            type: user.user_type,
            email: user.email,
            phone: user.phone,
            expireTime: expiration_time,
        },
      jwtsecret,
      {
        expiresIn: (100 * 3600 * 24 * 30 * 1000),
      }
    )
    var obj = {
        token: token,
        expiration_time: expiration_time
    }
  
    return obj
  }
exports.padLeadingZeros = function(num, size) {
    var s = num+""
    while (s.length < size) s = "0" + s
    return s
}
exports.formatTime = function(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

exports.imageUpload = function(file) {
    var sampleFile = file
    sampleFileName = Date.now() + "_" + sampleFile.name
    uploadPath = "./application/public/uploads/" + sampleFileName
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
        throw err
        }
    })
    return sampleFileName
}
