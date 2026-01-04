import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "../styles/index.css";

// Main component
import Home from "./components/Home.jsx";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);


let seconds = 0;          // current value shown on screen
let mode = "up";          // "up" or "down"
let running = true;       // true = ticking, false = paused
let alertAt = null;       // number of seconds where we show alert, or null if none
let secondsSinceLoad = 0;

// Render function: sends current values to Home />
function renderApp() {
  root.render(
    <React.StrictMode>
      <Home
        seconds={seconds}
        mode={mode}
        running={running}
        onStartCountdown={startCountdown}
        onStop={stopTimer}
        onReset={resetTimer}
        onResume={resumeTimer}
        onSetAlertTarget={setAlertTarget}
        secondsSinceLoad={secondsSinceLoad}
      />
    </React.StrictMode>
  );
}

// First render
renderApp();

// Interval: runs every second and updates the timer
setInterval(() => {
   secondsSinceLoad += 1;
  if (!running) return; // if paused, do nothing

  if (mode === "up") {
    seconds += 1;
  } else if (mode === "down") {
    seconds -= 1;
  }

  // Alert when we reach the target time
  if (alertAt !== null && seconds === alertAt) {
    alert(`⏱️ Your target time of ${alertAt} seconds has been reached.`);
    alertAt = null; // clear alert so it doesn’t repeat
  }

  // If we are counting down and reach 0, stop
  if (mode === "down" && seconds <= 0) {
    seconds = 0;
    running = false;
    alert("⏳ Countdown finished!");
  }

  renderApp();
}, 1000);


// start countdown from a given number
function startCountdown(startSeconds) {
  mode = "down";
  seconds = startSeconds;
  running = true;
  renderApp();
}

// stop / reset / resume
function stopTimer() {
  running = false;
  renderApp();
}

function resetTimer() {
  mode = "up";
  seconds = 0;
  running = true;
  renderApp();
}

function resumeTimer() {
  running = true;
  renderApp();
}

// alert at specified time
function setAlertTarget(targetSeconds) {
  alertAt = targetSeconds;
  if (alertAt !== null) {
    console.log(`Alert set at ${alertAt} seconds`);
  }
}