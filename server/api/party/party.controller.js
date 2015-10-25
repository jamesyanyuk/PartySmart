'use strict';

var _ = require('lodash');
var Party = require('./party.model');

var geolib = require('geolib');
var shortid = require('shortid');

// Search query radius in miles
var searchQueryRadius = 0.25;

// Default party watch duration (in hours)
var defaultWatchDuration = 24;

function inRange(locA, locB, searchQueryRadius) {
  var distanceInMeters = geolib.getDistance(locA, locB);
  var distanceInMiles = 0.000621371192;

  return (distanceInMiles <= searchQueryRadius);
}

// Get list of parties
exports.index = function(req, res) {
  Party.find(function (err, parties) {
    if(err) { return handleError(res, err); }
    return res.json(200, parties);
  });
};

// Create a party
exports.create = function(req, res) {
  Party.create({
    id: shortid.generate(),
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    address: req.body.address,
    date: new Date(req.body.date),
    contactMobilePhone: req.body.contactMobilePhone,
    contactEmail: req.body.contactEmail,
    expireAt: new Date(new Date(req.body.date).getTime() + (defaultWatchDuration * 60 * 60 * 1000))
  }, function(err, party) {
    if(err) { return handleError(res, err); }
    return res.json(201, party);
  });
};

// Query for a party by given location and current date/time
exports.query = function(req, res) {
  var datetime = new Date();
  var partiesInRange = [];

  Party.find({
    date: { $lte: datetime }
  }, function(err, parties) {
    if(err) { return handleError(res, err) }

    parties.forEach(function(party) {
      if(inRange({ latitude: party.latitude, longitude: party.longitude },
          { latitude: req.body.latitude, longitude: req.body.longitude }, searchQueryRadius))
        partiesInRange.push(party);
    });

    return res.json(200, partiesInRange);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
