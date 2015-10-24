'use strict';

var _ = require('lodash');
var Party = require('./party.model');

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
  Party.find({
    date: new Date(),
    time: {  }
  });
};

/**
// Get a single party
exports.show = function(req, res) {
  Party.findById(req.params.id, function (err, party) {
    if(err) { return handleError(res, err); }
    if(!party) { return res.send(404); }
    return res.json(party);
  });
};

// Updates an existing party in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Party.findById(req.params.id, function (err, party) {
    if (err) { return handleError(res, err); }
    if(!party) { return res.send(404); }
    var updated = _.merge(party, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, party);
    });
  });
};

// Deletes a party from the DB.
exports.destroy = function(req, res) {
  Party.findById(req.params.id, function (err, party) {
    if(err) { return handleError(res, err); }
    if(!party) { return res.send(404); }
    party.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};
**/

function handleError(res, err) {
  return res.send(500, err);
}
