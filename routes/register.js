const express = require('express')
const router = express.Router()
const RegisterController = require('../controller/RegisterController')

router.get('/register',RegisterController.register);
router.post('/postregister',RegisterController.postRegister);

module.exports = router;