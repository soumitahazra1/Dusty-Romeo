const axios = require("axios")
var configConstant = require('../config/constant')
const tlClient = axios.create({
    baseURL: "https://api.textlocal.in/",
    params: {
      apiKey: configConstant.TEXTLOCAL_API_KEY,
      sender: configConstant.TEXTLOCAL_SENDER_ID
    }
})
const smsClient = {
    sendPartnerWelcomeMessage: user => {
      if (user && user.phone && user.name) {
        const params = new URLSearchParams()
        params.append("numbers", [parseInt("91" + user.phone)])
        params.append(
          "message",
          `Hi ${user.name},
  Welcome to iWheels, Download our app to get bookings from our customers with better pricing. 
  https://iwheels.co`
        )
        tlClient.get("/send", params)
        .then(function (response) {
        console.log(response.data);
        })
        .catch(function (error) {
        console.log(error);
        })
      }
    },
    sendVerificationMessage: user => {
      if (user && user.phone) {
        const params = new URLSearchParams()
        params.append("numbers", [parseInt("91" + user.phone)])
        params.append(
          "message",
          `Your iWheels verification code is ${user.verifyCode}`
        )
        tlClient.get("/send", params)
.then(function (response) {
console.log(response.data);
})
.catch(function (error) {
console.log(error);
});
      }
    }
  }
  module.exports = smsClient