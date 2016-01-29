// Load required packages
var App = require('../models/app');
var _ = require('underscore');

// Create endpoint /api/apps for POST
exports.postApps = function(req, res) {
  // Create a new instance of the App model
  var app = new App();

  // Set the app properties that came from the POST data
  app.name = req.body.name;
  app.description = req.body.description;

  // Save the app and check for errors
  app.save(function(err, app) {
    if (err)
      res.send(err);

    res.json({ message: 'App Created!', data: app });
  });
};

// Create endpoint /api/apps for GET
exports.getApps = function(req, res) {
  // Use the App model to find all app
  App.find(function(err, apps) {
    if (err)
      res.send(err);

    res.json(apps);
  });
};

// Create endpoint /api/apps/:app_id for GET
exports.getApp = function(req, res) {
  // Use the App model to find a specific app
  App.find({ _id: req.params.app_id }, function(err, app) {
    if (err)
      res.send(err);

    res.json(app);
  });
};

// Create endpoint /api/apps/:app_id for PUT
exports.putApp = function(req, res) {
  // Use the App model to find a specific app
  App.update({ _id: req.params.app_id }, { description: req.body.description }, function(err, app) {
    if (err)
      res.send(err);

    res.json({ message: 'App updated', app: app });
  });
};

// Create endpoint /api/apps/:app_id for DELETE
exports.deleteApp = function(req, res) {
  // Use the App model to find a specific app and remove it
  App.remove({ _id: req.params.app_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'App removed from the locker!' });
  });
};

// Create endpoint /api/apps/:app_id/services for GET services
exports.getAppServices = function(req, res) {
  // Use the App model to find a specific app
  App.find({ _id: req.params.app_id }, function(err, app) {
    if (err)
      res.send(err);

    res.json({'services': app[0].services});
  });
};

// Create endpoint /api/apps/:app_id/services for services PUT
exports.putAppServices = function(req, res) {
  var update_body = {};
  if(typeof(req.body.service) === 'string'){
    update_body = {
      services: req.body.service
    }
  }
  if(typeof(req.body.service) === 'object'){
    var service_array = [];
    for(var i=0; i<req.body.service.length; i++){
      service_array.push(req.body.service[i]);
    }
    update_body = {
      services: service_array
    }
  }

  App.update({ _id: req.params.app_id }, update_body, function(err, app) {
    if (err)
      res.send(err);

    res.json({ message: 'App updated', app: app });
  });
};