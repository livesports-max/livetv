document.addEventListener('DOMContentLoaded', () => {
    fetch('data/M1.json')
        .then(response => response.json())
        .then(data => {
            const channelList = document.getElementById('channel-list');
            channelList.innerHTML = ''; // Clear existing channels
            data.forEach(channel => {
                if (channel.link) { // Ensure the channel has a streaming link
                    const channelDiv = document.createElement('div');
                    channelDiv.className = 'channel';
                    channelDiv.innerHTML = `
                        <img src="${channel.logo}" alt="${channel.name}">
                        <h3>${channel.name}</h3>
                        <button onclick="playChannel('${channel.link}')">Watch Now</button>
                    `;
                    channelList.appendChild(channelDiv);
                }
            });
        })
        .catch(error => console.error('Error loading channels:', error));
});

function playChannel(link) {
    const player = videojs('video-player');
    player.src({ type: 'application/x-mpegURL', src: link });
    player.play();

    // Request full-screen mode
    const videoElement = document.getElementById('video-player');
    if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { // Firefox
        videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { // IE/Edge
        videoElement.msRequestFullscreen();
    }

    // Enable Picture-in-Picture
    if (document.pictureInPictureEnabled && !videoElement.disablePictureInPicture) {
        videoElement.requestPictureInPicture().catch(error => {
            console.error('Error enabling Picture-in-Picture:', error);
        });
    }
}
