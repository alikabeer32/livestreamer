var connection = new RTCMultiConnection();

// this line is VERY_important
connection.socketURL = '/';

// all below lines are optional; however recommended.

connection.session = {
    audio: false,
    video: false,
    oneway:true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

connection.onstream = function(event) {
    document.body.appendChild( event.mediaElement );
};

var predefinedRoomId = 'YOUR_Name';

document.getElementById('btn-open-room').onclick = function() {
    this.disabled = true;
    connection.open( predefinedRoomId );
};

document.getElementById('btn-join-room').onclick = function() {
    this.disabled = true;
    connection.join( predefinedRoomId );
};