
var player = document.getElementById('player');

var peer = new Peer(undefined,{
	host: "/",
	port: 9000,
	path: '/peerjs'
})

var socket = io('/');

peer.on("open", id => {
  socket.emit('viewer-added', id);
});

peer.on('call', function(call) {
  
  console.log(player);
  console.log(call);

  
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.mediaDevices.getUserMedia({
  video: false, 
  audio: false}).then(stream => {
  call.on('stream', function(remoteStream) {
    // Show stream in some video/canvas element.
    console.log(player);
    player.src = remoteStream;

  });
  })

});
