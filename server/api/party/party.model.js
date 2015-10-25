'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Duration and time in milliseconds
var PartySchema = new Schema({
  id: String,
  latitude: Number,
  longitude: Number,
  address: String,
  date: Date,
  contactMobilePhone: String,
  contactEmail: String,
  expireAt: Date
});

// Expire at the time indicated by the expireAt field
PartySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Party', PartySchema);
