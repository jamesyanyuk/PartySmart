var twilioClient = require('twilio')('AC71592bf821af3becec393a327fc49c5f', 'e71f78a55af53e976b80c6906c922af7');
var request = require('request');

var config = require('../config/environment');

var sendToParties = function(parties, message) {
  parties.forEach(function(party) {
    request('http://localhost:'+config.port+'/api/party/'+party.id, function(err, response, body) {
      if(err) { return console.log('ERROR 1: ' + err) }
      if(!body) return;

      var data = JSON.parse(body);
      sendToNumber(data.contactMobilePhone, message);
    });
  });
};

var sendToNumber = function(number, message) {
  var parsedNumber = '+1' + number.replace(/\D/g,'');

  twilioClient.sendMessage({
    to: parsedNumber,
    from: '+17818722036',
    body: message
  }, function(err, response) {
    if(err) return console.log(err);
    console.log(response);
  });
};

exports.sendToNumber = sendToNumber;
exports.sendToParties = sendToParties;
