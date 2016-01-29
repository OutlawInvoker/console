// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var AppSchema   = new mongoose.Schema({
  name: String,
  description: String,
  services: [String]
});

// Export the Mongoose model
module.exports = mongoose.model('App', AppSchema);