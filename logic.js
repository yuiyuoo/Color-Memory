  const colors = ["green", "red", "yellow", "blue"];
  let gameSequence = [];
  let playerSequence = [];
  let level = 0;
  let clickable = false;

  const statusText = document.getElementById("status");
  const startBtn = document.getElementById("startBtn");
  const keyboardBtn = document.getElementById("keyboardBtn");


  // Frequencies for each color
  const soundMap = {
    green: 261.6,   // C4
    red: 329.6,     // E4
    yellow: 392.0,  // G4
    blue: 523.3     // C5
  };

  let keyboard = false;

  // function playSound(color) {
  //   const freq = soundMap[color];
  //   const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  //   const oscillator = audioCtx.createOscillator();
  //   const gainNode = audioCtx.createGain();

  //   oscillator.type = "sine";
  //   oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  //   oscillator.connect(gainNode);
  //   gainNode.connect(audioCtx.destination);

  //   oscillator.start();
  //   gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime); // volume
  //   oscillator.stop(audioCtx.currentTime + 0.3); // duration
  // }

  function nextRound() {
    playerSequence = [];
    level++;
    statusText.textContent = "Level " + level;
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);
    playSequence();
  }

  function playSequence() {
    clickable = false;
    let delay = 0;
    gameSequence.forEach((color, index) => {
      setTimeout(() => {
        flashColor(color);
      }, delay);
      delay += 600;
    });
    setTimeout(() => {
      clickable = true;
    }, delay);
  }

  function flashColor(color) {
    const btn = document.getElementById(color);
    btn.classList.add("active");
    setTimeout(() => {
      btn.classList.remove("active");
    }, 300);
  }

  function handlePlayerInput(color) {
    if (!clickable) return;
    playerSequence.push(color);
    flashColor(color);
    checkAnswer(playerSequence.length - 1);
  }

  function checkAnswer(index) {
    if (playerSequence[index] !== gameSequence[index]) {
      statusText.textContent = "Game Over! You reached Level " + level + " (Press Enter to Restart)";
      gameSequence = [];
      level = 0;
      clickable = false;
      return;
    }
    if (playerSequence.length === gameSequence.length) {
      setTimeout(nextRound, 800);
    }
  }

  function startGame() {
    gameSequence = [];
    level = 0;
    statusText.textContent = "Good Luck!";
    nextRound();
  }

  // Mouse clicks
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      handlePlayerInput(btn.id);
    });
  });

  // Keyboard input
  document.addEventListener("keydown", (e) => {
    if (!keyboard) return;
    const keyMap = {
      "1": "green",
      "2": "red",
      "3": "yellow",
      "4": "blue"
    };

    if (keyMap[e.key]) {
      handlePlayerInput(keyMap[e.key]);
    }

    if (e.key === "Enter") {
      startGame();
    }
  });

  // Button click
  startBtn.addEventListener("click", startGame);

keyboardBtn.addEventListener("click", () => {
  keyboard = !keyboard;

  document.querySelectorAll(".number").forEach(number => {
    if (keyboard) {
      number.classList.add("keyboard-active");
    } else {
      number.classList.remove("keyboard-active");
    }
  });

  if (keyboard) {
    keyboardBtn.textContent = "Keyboard Mode: ON ✅";
  } else {
    keyboardBtn.textContent = "Play with Keyboard";
  }
});
