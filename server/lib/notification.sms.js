var twilioClient = require('twilio')('AC71592bf821af3becec393a327fc49c5f', 'e71f78a55af53e976b80c6906c922af7');

var sendToParties = function(parties, message) {
  // Send sms message through twilio
};

var sendToNumber = function(number, message) {
  var parsedNumber = '+1' + number.replace(/\D/g,'');

  twilioClient.sendMessage({
    to: parsedNumber,
    from: '+17818722036',
    body: message
  }, function(err, response) {
    if(err) return console.log('ERROR: ' + error);
    console.log(response);
  });
};

exports.sendToNumber = sendToNumber;
exports.sendToParties = sendToParties;
