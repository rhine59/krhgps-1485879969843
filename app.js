var express = require('express'),
    app = express(),
    twilio = require('twilio');
 
var port = (process.env.VCAP_APP_PORT || 3000);
 
// Pull in Twilio config from the BlueMix environment
// The VCAP_SERVICES environment variable contains a JSON string with all your
// Bluemix environment data
var config = JSON.parse(process.env.VCAP_SERVICES);
 
// Loop through user-provided config info and pull out our Twilio credentials
var twilioSid, twilioToken;
config['user-provided'].forEach(function(service) {
    if (service.name == 'Twilio') {
        twilioSid = service.credentials.accountSID;
        twilioToken = service.credentials.authToken;
    }
});
 
// http://krhgps.mybluemix.net/message?nmbr=4&msg=what is going on

app.get('/message', function (req, res) {
    var nmbr = req.param('nmbr');
    var msg = req.param('msg');
    var client = new twilio.RestClient(twilioSid, twilioToken);
    client.sendMessage({
        to:'+'+nmbr,
 //       to:'+447734325154',
        from:'+441296340390',
        body: msg,
//        body:'This is from the BlueMix krhgps application!'
    }, function(err, message) {
//        res.send('Message sent! ID: '+message.sid);
        res.send('Variables from the URL '+nmbr+' '+msg);
    });
}); 

var server = app.listen(port, function () {
  console.log('Granville Twilio Application started')
});
