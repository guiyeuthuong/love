 const speed = 40;
  let i = 0;

  function typeWriter() {
    const container = document.getElementById("typewriter");
    if (i < msg.length) {
      const char = msg.charAt(i);
      if (char === '\n') {
        container.innerHTML += "<br><span>";
      } else {
        container.innerHTML += char;
      }
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }

  document.getElementById("clover").onclick = () => {
    document.getElementById("clover").style.display = "none";
    document.getElementById("hint").style.display = "none";

    const card = document.getElementById("card");
    card.classList.add("show");

    document.getElementById("musicBtn").style.display = "block";
    music.play();
    musicBtn.classList.add("rotating");
    isPlaying = true;

    setInterval(createHeart, 300);

    setTimeout(typeWriter, 2000);
  };

  const music = document.getElementById("bgmusic");
  const musicBtn = document.getElementById("musicBtn");
  let isPlaying = false;

  musicBtn.onclick = function () {
    if (isPlaying) {
      music.pause();
      musicBtn.classList.remove("rotating");
    } else {
      music.play();
      musicBtn.classList.add("rotating");
    }
    isPlaying = !isPlaying;
  };