const express = require('express');
const router = express.Router();

// the controller
const AuthenticationController = require('../controllers/AuthenticationController')
// validation for controller as middleware
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

const ProfileController = require('../controllers/ProfileController')
const UtilController = require('../controllers/UtilController')
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' , message : 'Hello World I think' });
// });

router.post('/register' ,
    AuthenticationControllerPolicy.register, // validate in middleware
    AuthenticationController.register)   // pass request to the controller

router.post('/login' ,
    AuthenticationControllerPolicy.login, // validate in middleware
    AuthenticationController.login)   // pass request to the cont

router.get('/profile/:userId' ,
    ProfileController.getProfile)   // pass request to the controller

// idea is to create a user profile when the user selects Driver at front end - just hit save
// router.get('/profile/driver/:userId' ,
//     ProfileController.getDriverProfile)   // pass request to the controller

router.post('/profile/:userId' ,
    ProfileController.saveProfile)   // pass request to the controller

router.get('/pass_schedule/:profileId' ,
    ProfileController.getPassSchedule)   // pass request to the controller

router.get('/pass_drivers/:userId' ,
    ProfileController.getPassDrivers)   // pass request to the controller

router.get('/driver_pass/:userId' ,
    ProfileController.getDriverPass)   // pass request to the controller

router.get('/daysOfWeek' ,
    UtilController.setDaysOfWeek)   // pass request to the controller


module.exports = router;
