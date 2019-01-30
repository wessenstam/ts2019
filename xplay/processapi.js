var express = require('express')
var request = require('request');
var app = express()

var username = "user";
var password = "password";

//change to your real Prism Central user name and password below
var auth = "Basic " + new Buffer("pc user" + ":" + "pc password").toString("base64");

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/vm/:vm_uuid', function (req, res) {
  console.log("processing api on "+ req.params.vm_uuid);

//change to your real Prism Central ip address
  var url = "https://127.0.0.1:9440/api/nutanix/v3/vms/"+req.params.vm_uuid;

  request.get({
        url : url,
        headers : {
            "Authorization" : auth
        },
        rejectUnauthorized: false
      }, function(error, response, body)
           { //console.log(error);
             //console.log(response);
             var jsonObject = JSON.parse(body);
             delete jsonObject.status
             jsonObject.metadata["categories"] = {"Quarantine": "Default"}
             res.json(jsonObject); console.log("body returned"); //console.log(body);

      });
})

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
