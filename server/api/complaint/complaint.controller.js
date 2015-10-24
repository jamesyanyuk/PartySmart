'use strict';

var _ = require('lodash');
var Complaint = require('./complaint.model');

// Get list of complaints
exports.index = function(req, res) {
  Complaint.find(function (err, complaints) {
    if(err) { return handleError(res, err); }
    return res.json(200, complaints);
  });
};

// Get a single complaint
exports.show = function(req, res) {
  Complaint.findById(req.params.id, function (err, complaint) {
    if(err) { return handleError(res, err); }
    if(!complaint) { return res.send(404); }
    return res.json(complaint);
  });
};

// Creates a new complaint in the DB.
exports.create = function(req, res) {
  Complaint.create(req.body, function(err, complaint) {
    if(err) { return handleError(res, err); }
    return res.json(201, complaint);
  });
};

// Updates an existing complaint in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Complaint.findById(req.params.id, function (err, complaint) {
    if (err) { return handleError(res, err); }
    if(!complaint) { return res.send(404); }
    var updated = _.merge(complaint, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, complaint);
    });
  });
};

// Deletes a complaint from the DB.
exports.destroy = function(req, res) {
  Complaint.findById(req.params.id, function (err, complaint) {
    if(err) { return handleError(res, err); }
    if(!complaint) { return res.send(404); }
    complaint.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}