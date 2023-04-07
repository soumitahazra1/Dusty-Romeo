const Sequelize = require("sequelize")
const sessions = require('express-session')
const {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect,
  pool
} = require('../config/database')
const SequelizeStore = require('connect-session-sequelize')(sessions.Store)
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  pool: {
    max: pool.max,
    min: pool.min,
    idle: pool.idle
  },
  define: {
    paranoid: true
  },
  logging: false
})
var storeSession = new SequelizeStore({
  db: sequelize,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

const db = {}
db.sequalize = sequelize
db.Sequelize = Sequelize
db.storeSession = storeSession

db.pages = require("../models/pages.js")(sequelize, Sequelize, storeSession)

module.exports = {
  db
}