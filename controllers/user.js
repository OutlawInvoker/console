// Load required packages
var btoa = require('btoa');
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  var token = getToken(req.body.username, req.body.password);

  user.save(function(err, user) {
    if (err)
      res.send(err);

    res.json({ User: user, token: token });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/login for Sign In POST
exports.loginUser = function(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      res.json(err);
      return;
    }

    // No user found with that username
    if (!user) {
      res.status(400);
      res.json({'message': 'Invalid username'});
      return;
    }

    // Make sure the password is correct
    user.verifyPassword(req.body.password, function(err, isMatch) {
      if (err) { 
        res.json(err);
        return;
      }

      // Password did not match
      if (!isMatch) {
        res.json({'Error': 'Password do not match'});
        return;
      }

      // Success
      var token = getToken(req.body.username, req.body.password);
      res.json({user: user, token: token});
    });
  });
};

function getToken(username, password) {
  // var baseString = "";
  // baseString = baseString + "" + username + ",";
  // baseString = baseString + password;
  // var token = btoa(baseString);
  var encodedData = new Buffer(username + ':' + password).toString('base64');
  var token = encodedData;
  return token;
}