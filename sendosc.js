const express = require('express');
const bodyParser = require('body-parser');

var app = require('express')();
var http = require('http').Server(app);

var receiveData=true;

app.get('/', function(req, res){
    //res.sendFile(__dirname + '/send_data.html');
    //res.send('<h1>Hello world</h1>'); 
    //res.sendFile(__dirname + '/index.html');
});
 
http.listen(3000, function(){
    console.log('HTTP server started on port 3000');
});

var io = require('socket.io')(http);
var messageReceive;
io.on('connection', function(socket){
        socket.on('chat message', function(msg){
            messageReceive=msg;
            sendosc();
            
        });
});
function sendosc()
{
  var { Server } = require('node-osc/lib');
  var oscServer = new Server(4444, '127.0.0.1');
  oscServer.on('message', function (msg) {
    //console.log(msg);
    io.emit('chat message', msg);
  });
  
  const { Client } = require('node-osc');
  const client = new Client('127.0.0.1', 3333);
  client.send('/oscAddress', messageReceive, () => {
    client.close();
  });

}
//setInterval(function(){ io.emit('chat message', 'wilson885'); }, 3000);
