'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PartySchema = new Schema({
  latitude: Number,
  longitude: Number,
  address: String,
  date: Date,
  time: String,
  duration: String,
  contactMobilePhone: String,
  contactEmail: String
});

module.exports = mongoose.model('Party', PartySchema);
