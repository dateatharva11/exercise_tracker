const express = require('express')
const router = express.Router()
const RegisterController = require('../controller/RegisterController')

router.get('/register',RegisterController.register);
router.post('/postregister',RegisterController.postRegister);
router.get('/login',RegisterController.login);
router.post('/postlogin',RegisterController.postlogin);
router.get('/logout',RegisterController.logout);

module.exports = router;