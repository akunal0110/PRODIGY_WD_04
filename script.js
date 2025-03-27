let isRunning = false;
let elapsedTime = 0;
let startTime = 0;
let timerInterval;
let lapCount = 0;

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

// ⏳ Start / Resume Stopwatch
startBtn.addEventListener("click", function () {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        resetBtn.style.display = "inline-block";
        lapBtn.style.display = "inline-block";
    }
});

// ⏸ Pause Stopwatch
pauseBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = Date.now() - startTime;
    pauseBtn.style.display = "none";
    startBtn.style.display = "inline-block";
    startBtn.textContent = "Resume";
});

// 🔄 Reset Stopwatch
resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;
    startBtn.style.display = "inline-block";
    startBtn.textContent = "Start";
    pauseBtn.style.display = "none";
    resetBtn.style.display = "none";
    lapBtn.style.display = "none";
    lapList.innerHTML = "";
    updateDisplay(0);
});

// 🏁 Lap Time
lapBtn.addEventListener("click", function () {
    if (isRunning) {
        lapCount++;
        let lapTime = formatTime(elapsedTime);
        let lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
});

// ⏱ Update Timer Display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
}

// 🎯 Update Display Function
function updateDisplay(time) {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    
    minutesDisplay.textContent = formatNumber(minutes);
    secondsDisplay.textContent = formatNumber(seconds);
    millisecondsDisplay.textContent = formatNumber(milliseconds);
}

// 🔢 Format Numbers to Always Show Two Digits
function formatNumber(num) {
    return num < 10 ? "0" + num : num;
}

// ⏳ Convert Milliseconds to MM:SS:MS Format
function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);
    return `${formatNumber(minutes)}:${formatNumber(seconds)}:${formatNumber(milliseconds)}`;
}
