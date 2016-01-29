// Load required packages
var Service = require('../models/service');

// Create endpoint /api/services for POST
exports.postServices = function(req, res) {
  // Create a new instance of the Service model
  var svc = new Service();

  // Set the svc properties that came from the POST data
  svc.name = req.body.name;
  svc.description = req.body.description;

  // Save the svc and check for errors
  svc.save(function(err, svc) {
    if (err)
      res.send(err);

    res.json({ message: 'Service Created!', data: svc });
  });
};

// Create endpoint /api/services for GET
exports.getServices = function(req, res) {
  // Use the Service model to find all svc
  Service.find(function(err, svcs) {
    if (err)
      res.send(err);

    res.json(svcs);
  });
};

// Create endpoint /api/services/:svc_id for GET
exports.getService = function(req, res) {
  // Use the Service model to find a specific svc
  Service.find({ _id: req.params.svc_id }, function(err, svc) {
    if (err)
      res.send(err);

    res.json(svc);
  });
};

// Create endpoint /api/services/:svc_id for PUT
exports.putService = function(req, res) {
  // Use the Service model to find a specific svc
  Service.update({ _id: req.params.svc_id }, { description: req.body.description }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Service updated' });
  });
};

// Create endpoint /api/services/:svc_id for DELETE
exports.deleteService = function(req, res) {
  // Use the Service model to find a specific svc and remove it
  Service.remove({ _id: req.params.svc_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Service removed from the locker!' });
  });
};