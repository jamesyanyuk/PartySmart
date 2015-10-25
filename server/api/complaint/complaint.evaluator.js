var request = require('request');

var smsNotification = require('../../lib/notification.sms');

var config = require('../../config/environment');

// Interval in seconds
var loop = function(interval) {
  setInterval(function() {
    // Iterate through all complaints in Complaint table
    request('http://localhost:'+config.port+'/api/complaint', function(err, response, body) {
      if(!body) return;

      var complaints = JSON.parse(body);
      complaints.forEach(function(complaint) {
        var diff = Math.abs(new Date() - complaint.timestamp);
        var minuteDiff = Math.floor((diff/1000)/60);

        if(minuteDiff >= 20 && minuteDiff <= 30 && complaint.status === 'PENDING') {
          smsNotification.sendToNumber(complaint.complainant, 'Has the noise been reduced? (Reply with YES or NO)');
          request.put({url: 'http://localhost:'+config.port+'/api/complaint/'+complaint.complainant, form: {
            status: 'AWAITINGRESPONSE'
          }}, function(putErr, response, body) {
            if(putErr) console.log('ERROR: ' + putErr);
          });
        } else if(minuteDiff >= 30) {
          request.del('http://localhost:'+config.port+'/api/complaint/'+complaint.complainant, function(delErr) {
            if(delErr) console.log('ERROR: ' + delErr);
          });
          // Send notification to complaintif notifying them that the transaction has ended
          smsNotification.sendToNumber(complaint.complainant, 'Your complaint has been dropped due to your inactivity.');
        }
      });
    });
  }, interval * 1000);
}

exports.loop = loop;
