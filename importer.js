const io  = require('socket.io-client');
var Peer = require('simple-peer');


var peer = new Peer({
    initiator: true,
    trickle:false
})

var checker = "check check";

peer.on('signal', function(data){
    alert(data);
})
