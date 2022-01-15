const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const multer = require('../middleware/multer-config')

const userCtrl = require('../controllers/user.controller')


router.post('/signup', multer, userCtrl.signup)
router.post('/signin', userCtrl.signin)
router.post('/user', auth, userCtrl.checkUser)
router.get('/findUser', auth, userCtrl.findUser)
router.put('/updateUser/:id', auth, multer, userCtrl.updateUser)

module.exports = router