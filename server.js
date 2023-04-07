const express       = require('express')
const cookieParser  = require("cookie-parser")
const sessions      = require('express-session')
const App           = express()
const path          = require('path')
const axios         = require('axios')
const cors          = require("cors")
const process       = require("process")
const grapesjs      = require("grapesjs")
const fileUpload = require('express-fileupload')
const mysql = require("mysql2")
var configConstant = require("./application/config/constant")
const https = require('http').Server(App)
App.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./application/public/uploads"
}));
const { 
  API_URL,
  API_KEY,
  SOURCE }          = require('./application/config/api')
const PORT          = process.env.PORT || 3144
App.use(express.static(path.join(__dirname, 'application/public')))
App.use(express.json());
App.use(express.urlencoded({
    extended: true
}));
const oneDay = 3600 * 24 * 30 * 1000;
const {db} = require('./application/models')
// App.use(sessions({
//     secret: "53536311secrctekeyfhrgfgrfrty0687564rw3234e5659884fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     store: db.storeSession,
//     resave: false
// }));
App.use(sessions({
  store: db.storeSession,
  name: 'MyStrange-Cookie',
  secret: 'share-app',
  resave: false,
  // saveUninitialized: true,
  // resave: true,
  saveUninitialized: true,
  rolling: true, // <-- Set `rolling` to `true`

  cookie: {
    maxAge: 1 * 60 * 60 * 1000
  }
}))
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

App.use(cors(corsOptions))
db.sequalize.sync()
App.use(cookieParser());
App.set('views', path.join(__dirname, 'application/views'))
App.use('application/public/uploads', express.static('uploads'))
App.set('view engine', 'ejs')
const conn = mysql.createConnection({
  host: configConstant.mySqlHost,
  user: configConstant.mySqlUser,
  password: configConstant.mySqlPassword,
  database: configConstant.mySqlDbName,
})
App.use (async (request, response, next) => {
    // response.locals.currentUrl = request.originalUrl
    response.locals.host = request.get('host')
    response.locals.protocol    = request.protocol
    response.locals.apiUrl      = API_URL
    response.locals.apiKey      = API_KEY
    response.locals.apiSource   = SOURCE
    response.locals.currentUrl = request.url.split('/')[1]
    response.locals.baseUrl = request.protocol + '://' + request.get('host')
    response.locals.accessMenuList   = []
    if(request.session.token){
      response.locals.token                 = request.session.token
      response.locals.userName              = request.session.userName
      response.locals.userPhone             = request.session.userPhone
      response.locals.userEmail             = request.session.userEmail
      response.locals.userAddress           = request.session.userAddress
      response.locals.userProfileImage      = request.session.userProfileImage == "" || request.session.userProfileImage == null
      ? configConstant.uriUrl + "/images/no-img.png"
      : configConstant.uriUrl + "/uploads/" + request.session.userProfileImage
      response.locals.userId                = request.session.userId
      response.locals.roleId                = request.session.roleId
      next()
    }else{
      response.locals.token                 = ""
      response.locals.userName              = ""
      response.locals.userPhone             = ""
      response.locals.userEmail             = ""
      response.locals.userAddress           = ""
      response.locals.userProfileImage      = ""
      response.locals.userId                = ""
      response.locals.roleId                = ""
      response.locals.accessMenuList        = []
      next()
    }
})
App.use('/',require('./application/routes/auth'))
App.get('*', function(request, response,next){
  var pageTitle = 'Atif Anwar'
  return response.render('pages/404',{
      pageTitle
  })
})
https.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})