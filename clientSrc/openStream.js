function openStream (myCallback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((mediaStream) => {
        myCallback(mediaStream);
    }).catch((err) => {
        console.log(err.name + ": " + err.message);
    });
}

module.exports = openStream;