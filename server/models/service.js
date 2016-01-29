// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ServiceSchema   = new mongoose.Schema({
  name: String,
  description: String
});

// Export the Mongoose model
module.exports = mongoose.model('Service', ServiceSchema);