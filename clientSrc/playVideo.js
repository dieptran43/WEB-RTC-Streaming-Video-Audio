function playVideo (mediaStream, videoId) {
    const video = document.getElementById(videoId);
    video.srcObject = mediaStream;
    video.onloadeddata = function (e) {
        video.play();
    }
}

module.exports = playVideo;