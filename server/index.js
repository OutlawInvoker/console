// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Controllers
var appController = require('./controllers/app');
var svcController = require('./controllers/service');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/admin');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

app.use('/admin', express.static(__dirname + '/../client'));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /api/apps
router.route('/apps')
  .post(authController.isAuthenticated, appController.postApps)
  .get(authController.isAuthenticated, appController.getApps);

// Create endpoint handlers for /api/apps/:app_id
router.route('/apps/:app_id')
  .get(authController.isAuthenticated, appController.getApp)
  .post(authController.isAuthenticated, appController.putApp)
  .delete(authController.isAuthenticated, appController.deleteApp);

// Create endpoint handlers for /api/services
router.route('/services')
  .post(authController.isAuthenticated, svcController.postServices)
  .get(authController.isAuthenticated, svcController.getServices);

// Create endpoint handlers for /api/services/:svc_id
router.route('/services/:svc_id')
  .get(authController.isAuthenticated, svcController.getService)
  .post(authController.isAuthenticated, svcController.putService)
  .delete(authController.isAuthenticated, svcController.deleteService);

// Create endpoint handlers for /api/apps/:app_id/services
router.route('/apps/:app_id/services')
  .get(authController.isAuthenticated, appController.getAppServices)
  .post(authController.isAuthenticated, appController.putAppServices);

// Create endpoint handlers for /api/users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint for login
router.route('/login')
  .post(userController.loginUser);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
console.log('Listening on port 3000!');