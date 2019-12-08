const express = require ('express')
const router = express.Router()
const UserControler = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const images = require("../helpers/image.js");

router.post('/create', UserControler.create)
router.post('/login', UserControler.login)
router.post('/signGoogle', UserControler.signInGoogle)
router.post('/forgotps', UserControler.sendCode)
router.patch('/forgotps', UserControler.forgotPass)

router.get('/', authentication, UserControler.identity)
router.post('/', authentication,UserControler.identity)
router.put('/', authentication, images.multer.single("image"),
images.sendUploadToGCS, UserControler.edit)
router.patch('/', authentication, UserControler.resetPass)
module.exports = router