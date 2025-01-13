// Replace 'YOUR_M3U8_URL_HERE' with the actual .m3u8 URL
const m3u8Url = 'https://sajalsdrive.xyz/0:/1.m3u8';

const video = document.getElementById('videoPlayer');
const statusMessage = document.getElementById('statusMessage');

// Check if HLS.js is supported
if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(m3u8Url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
        statusMessage.textContent = "Live stream is playing.";
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
            statusMessage.textContent = "An error occurred. Please try again later.";
            console.error('HLS Error:', data);
        }
    });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // For Safari browsers
    video.src = m3u8Url;
    video.addEventListener('loadedmetadata', () => {
        video.play();
        statusMessage.textContent = "Live stream is playing.";
    });
} else {
    statusMessage.textContent = "HLS is not supported in your browser.";
}
