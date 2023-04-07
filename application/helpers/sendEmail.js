var configConstant = require('../config/constant')
var mailer = require('nodemailer')
var smtpTransport = mailer.createTransport({
    host: configConstant.SMTP_HOST,
    port: configConstant.SMTP_PORT,
    secure: false,
    auth: {
        user:configConstant.SMTP_USER,
        pass:configConstant.SMTP_PASS
    }
})

function sendMail(email,subject,content, attachments){
    if(attachments != ''){
        var mailContent = {
            from:{
                name:configConstant.FROM_NAME,
                address:configConstant.FROM_EMAIL
            },
            to:email,
            subject:subject,
            html:content,
            attachments: [
                {
                    filename: 'invoice.pdf',
                    path: attachments
                }
            ]
        }
        smtpTransport.sendMail(mailContent, function(error,response){
        if(error){
                console.log(error)
        } else {
                console.log(response.response)
        }
            
        })
    }else{
        var mailContent = {
            from:{
                name:configConstant.FROM_NAME,
                address:configConstant.FROM_EMAIL
            },
            to:email,
            subject:subject,
            html:content,
        }
        smtpTransport.sendMail(mailContent, function(error,response){
           if(error){
                console.log(error)
           } else {
                console.log(response.response)
           }
            
        })
    }
}
module.exports = sendMail