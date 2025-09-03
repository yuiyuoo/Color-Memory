const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let clickable = false;

const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

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

function handlePlayerInput(color) {
    if (!clickable) return;
    playerSequence.push(color);
    flashColor(color);
    checkAnswer(playerSequence.length - 1);
}

// Mouse clicks
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        handlePlayerInput(btn.id);
    });
});

// Keyboard input
document.addEventListener("keydown", (e) => {
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
