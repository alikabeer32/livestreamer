var player = document.getElementById('player');


var peer = new Peer(undefined,{
	host: "/",
	port: 9000,
	path: '/peerjs'
})


var socket = io('/');


peer.on('open', id => {
  socket.emit('creator-added', id);
})

$(window).on('beforeunload', function(){
  socket.close();
});



console.log(peer);
console.log(socket);

var media = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.mediaDevices.getUserMedia({
  video: true, 
  audio: true}).then(stream => {
    addVideoStream(player, stream);
    socket.on('viewer-added', function(userId){
      console.log("Someone watching "+userId);
      sendFeed(player, stream, userId);
    })
  })



peer.on('call' , function(){
  alert("answer");
})

function addVideoStream(video, stream, userId){
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
    video.muted = true;

  })
}

function sendFeed(player, stream, userId){
  var call = peer.call(userId, stream);
  console.log(stream);
  call.on('stream', function(remoteStream) {
    // Show stream in some video/canvas element.
  });
}