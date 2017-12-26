const Peer = require('peerjs');
const uid = require('uid');
const $ = require('jquery');
const openStream = require('./openStream');
const playVideo = require('./playVideo');

var customConfig;
$.ajax ({
    url: "https://global.xirsys.net/_turn/trungquan17.github.io/",
    type: "PUT",
    async: false,
    headers: {
        "Authorization": "Basic " + btoa("trungquan17:c331e31c-e9d8-11e7-9fac-2c62765d3e65")
    },
    success: function (res){
        console.log("ICE List: "+res.v.iceServers);
        customConfig = res.v.iceServers;
    }
});


const config = { 
    host: 'rtc-trungquandev.herokuapp.com', 
    port: 443, 
    secure: true, 
    key: 'peerjs',
    config: customConfig
};

function getPeerID () {
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}
const peer = new Peer(getPeerID(), config);
// console.log(peer);

$('#btnCall').bind('click', () => {
    const friendId = $('#txtFriendId').val();
    openStream(function (myStream) {
        playVideo(myStream, 'local-stream');

        const call = peer.call(friendId, myStream);
        call.on('stream', function (remoteStream) {
            playVideo(remoteStream, 'friend-stream');
        }, function(err) {
            console.log('Failed to get local stream' ,err);
        });

    });
});

peer.on('call', function(call) {
    openStream(function (myStream) {
        playVideo(myStream, 'local-stream');

        call.answer(myStream);

        call.on('stream', function (remoteStream) {
            playVideo(remoteStream, 'friend-stream');
        }, function(err) {
            console.log('Failed to get local stream' ,err);
        });

    });
});
