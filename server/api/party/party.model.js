'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Duration and time in milliseconds
var PartySchema = new Schema({
  latitude: Number,
  longitude: Number,
  address: String,
  date: Date,
  time: Number,
  contactMobilePhone: String,
  contactEmail: String
});

module.exports = mongoose.model('Party', PartySchema);
