'use strict';

var _ = require('lodash');
var Party = require('./party.model');

var geolib = require('geolib');

// Search query radius in miles
var searchQueryRadius = 0.25;

function inRange(locA, locB, searchQueryRadius) {
  var distanceInMeters = geolib.distance(locA, locB);
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
  Party.create(req.body, function(err, party) {
    if(err) { return handleError(res, err); }
    return res.json(201, party);
  });
};

// Query for a party by given location and current date and time
exports.query = function(req, res) {
  var datetime = new Date();

  Party.find({
    date: datetime,
    time: { $lte: datetime.getMilliseconds() }
  }, function(err, parties) {
    if(err) { return handleError(res, err) }
    else {
      var partiesInRange = [];
      parties.forEach(function(party) {
        if(inRange({latitude: req.body.latitude, longitude: req.body.longitude},
            {latitude: party.latitude, longitude: party.longitude}, searchQueryRadius)) {
          partiesInRange.push(party);
        }
      });

      return res.json(200, partiesInRange);
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
