const express  = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require("socket.io")(http);
const RTCMultiConnectionServer = require('rtcmulticonnection-server');


const { ExpressPeerServer } = require('peer');
var creator;
var viewers = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/', function(req, res){
    res.render('creator');
});

app.get('/watch', function(req, res){
  res.render('watch');
});


const PORT = process.env.PORT || 5000;

const server = http.listen(PORT, () => console.log(`Live on ${PORT}`));



const { PeerServer } = require('peer');
 
const peerServer = PeerServer({ port: 9000, path: '/peerjs' });



io.on("connection", function(socket){
  
  RTCMultiConnectionServer.addSocket(socket);
  socket.on('viewer-added', (userId) => {
    console.log("Viewer Added"+userId);
    viewers.push(userId);
    io.emit('viewer-added', userId);
  });

  socket.on('creator-added', (userId) => {
    console.log("Creator Added"+userId);
    creator = userId;
  });
})

