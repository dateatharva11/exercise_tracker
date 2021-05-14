const express = require('express')
const router = express.Router()
const PagesController = require('../controller/PagesController')
const RegisterController = require('../controller/RegisterController')

//Admin routes
router.get('/form',PagesController.form);
router.post('/postaddexercises',PagesController.postaddexercises);

//User routes
router.get('/tasks',PagesController.tasks);
router.post('/posttasks',PagesController.posttasks);
router.get('/exercises',PagesController.exercises);
router.get('/meals',PagesController.meals);
router.get('/',RegisterController.dashboard);


module.exports = router;