const {
  dashboard,
  pageDetails,
  storePage,
} = require("../controllers/auth")

const express = require("express")
const router = express.Router()
router.get('/', dashboard)
router.post('/page-details', pageDetails)
router.post('/store-page', storePage)

module.exports = router
