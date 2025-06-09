  function extractYouTubeID(url) {
    const regex = /(?:youtube\.com.*[?&]v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const videoId = extractYouTubeID(youtubeURL);
  let player;
  let isMuted = false;

  function onUserInteraction() {
    if (typeof YT === 'undefined') {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    } else {
      onYouTubeIframeAPIReady();
    }

    document.removeEventListener('click', onUserInteraction);
    document.removeEventListener('touchstart', onUserInteraction);
  }

  document.addEventListener('click', onUserInteraction, { once: true });
  document.addEventListener('touchstart', onUserInteraction, { once: true });

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '0',
      width: '0',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1
      },
      events: {
        'onReady': function (event) {
          event.target.playVideo();
          document.getElementById('muteButton').style.display = 'inline-block';
        }
      }
    });
  }

  document.getElementById('muteButton').addEventListener('click', function () {
    if (player) {
      if (isMuted) {
        player.unMute();
        this.textContent = '🔇';
      } else {
        player.mute();
        this.textContent = '🔊';
      }
      isMuted = !isMuted;
    }
  });