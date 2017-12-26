const Peer = require('peerjs');
const uid = require('uid');
const $ = require('jquery');
const openStream = require('./openStream');
const playVideo = require('./playVideo');

const config = { host: 'rtc-trungquandev.herokuapp.com', port: 443, secure: true, key: 'peerjs' };
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
