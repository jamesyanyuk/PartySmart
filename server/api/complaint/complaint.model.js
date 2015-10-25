'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ComplaintSchema = new Schema({
  id: String,
  complainant: String,
  parties: [{
    id: String
  }],
  timestamp: Date,
  status: String,
  address: String,
  latitude: Number,
  longitude: Number,
  details: String
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
