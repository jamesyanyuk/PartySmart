'use strict';

var _ = require('lodash');
var Complaint = require('./complaint.model');
var Party = require('../party/party.controller');
var config = require('../../config/environment');

var shortid = require('shortid');
var request = require('request');

var smsNotification = require('../../lib/notification.sms');

// Get list of complaints
exports.index = function(req, res) {
  Complaint.find(function (err, complaints) {
    if(err) { return handleError(res, err); }
    console.log(complaints);
    return res.json(200, complaints);
  });
};

// Get a single complaint
exports.show = function(req, res) {
  Complaint.find({
    complainant: req.params.complainant
  }, function (err, complaints) {
    if(err) { return handleError(res, err); }
    if(!complaints) { return res.send(404); }
    return res.json(complaints[0]);
  });
};

// Updates existing complaint status
exports.update = function(req, res) {
  Complaint.find({
    complainant: req.params.complainant
  }, function(err, complaints) {
    if (err) { return handleError(res, err); }
    if(!complaints) { return res.send(404); }
    var complaint = complaints[0];
    complaint.status = req.body.status;
    complaint.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, complaint);
    });
  });
};

// Creates a new complaint in the DB given location
// complainant is the phone number (mobile)
exports.create = function(req, res) {
  // First check to see is user already has an active complaint (by phone number)
  request('http://localhost:'+config.port+'/api/complaint/'+req.body.complainant, function(err, response, body) {
    console.log('http://localhost:'+config.port+'/api/complaint/'+req.body.complainant);
    if(err) { return handleError(res, err) }
    if(body) return res.send(500);

    request({url: 'http://localhost:'+config.port+'/api/party/query', form: {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }}, function(err, response, body) {
      if(err) { return handleError(res, err); }
      var data = JSON.parse(body);

      var parties = [];
      data.forEach(function(party) {
        parties.push({ id: party.id });
      });

      // Check number of registered parties located
      if(parties.length === 0) {
        // Notify cops of noise disturbance at location of complainant
      } else {
        // Create complaint object and add all nearby registered parties
        Complaint.create({
          id: shortid.generate(),
          complainant: req.body.complainant,
          parties: parties,
          timestamp: new Date(),
          status: 'PENDING',
          address: req.body.address,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          details: req.body.details
        }, function(err, complaint) {
          if(err) { return handleError(res, err) }
          return res.json(201, complaint);
        });

        // Send notifications to contacts of all involved parties
        smsNotification.sendToParties(parties, 'There has been a noise complaint in your area. You have 20 minutes to settle down!');
      }
    });
  });
};

// Deletes a complaint from the DB.
exports.destroy = function(req, res) {
  Complaint.find({
    complainant: req.body.complainant
  }, function(err, complaints) {
    if(err) { return handleError(res, err); }
    if(!complaints) { return res.send(404); }
    complaints[0].remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
