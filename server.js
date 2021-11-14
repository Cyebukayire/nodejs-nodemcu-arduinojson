var express = require('express');
 var app = express(); 
var bodyParser = require('body-parser') 

app.get('/', function (req, res) { 
    res.send("Welcome to SmartHinga"); 
}) 

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.post('/', function(req, res) {    
    console.log(req.body.temperature);
    return res.send(JSON.stringify(req.body)).status(200);     
}) 

var server = app.listen(8081, function () {    
    var host = server.address().address    
    var port = server.address().port 
    console.log("Server listening at localhost:%s", host, port) 
})