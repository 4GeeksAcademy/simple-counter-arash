import React, { useState } from "react";
import CounterDisplay from "./CounterDisplay.jsx";

function Home({
  seconds, //current seconds
  mode, //counting up(up) or counting down (down)
  running,  //boolean, true-> timer is moving, false-> pause
  onStartCountdown, //function to start a countdown from a given number
  onStop, //function to stop/pause the timer
  onReset,  //function to reset and start counting
  onResume, //function
  onSetAlertTarget, //function
  secondsSinceLoad, 
}) {
  // local state ONLY for the inputs
  const [countdownInput, setCountdownInput] = useState("");
  const [alertInput, setAlertInput] = useState("");

  // Start countdown from the number typed by the user
  const handleStartCountdown = () => {
    const value = parseInt(countdownInput, 10);
    if (Number.isNaN(value) || value < 0) {
      alert("Please enter a valid non-negative number for the countdown.");
      return;
    }
    onStartCountdown(value);
  };

  // Set the alert target from the input
  const handleSetAlert = () => {
    const value = parseInt(alertInput, 10); 
    if (Number.isNaN(value) || value < 0) {
      alert("Please enter a valid non-negative number for the alert time.");
      return;
    }
    onSetAlertTarget(value);
  };

  return (
    <div>
      {/* Counter visual */}
      <CounterDisplay
        seconds={seconds}
        secondsSinceLoad={secondsSinceLoad}
      />
      {/* Info rajebe mode va status */}
      <p className="mt-3 text-secondary text-center">
        Mode:{" "}
        <span className="text-light">
          {mode === "up" ? "Counting up" : "Countdown"}
        </span>{" "}
        | Status:{" "}
        <span className="text-light">{running ? "Running" : "Stopped"}</span>
      </p>

      {/* Controls */}
      <div className="container mt-4">
        {/* Countdown controls */}
        <div className="row justify-content-center mb-3">
          <div className="col-auto">
            <label className="form-label text-light me-2">
              Countdown from (seconds):
            </label>
            <input
              type="number"
              min="0"
              className="form-control d-inline-block w-auto"
              value={countdownInput}
              onChange={e => setCountdownInput(e.target.value)}
            />
          </div>
          <div className="col-auto d-flex align-items-end">
            <button className="btn btn-warning" onClick={handleStartCountdown}>
              Start countdown
            </button>
          </div>
        </div>

        {/* Alert at time controls */}
        <div className="row justify-content-center mb-3">
          <div className="col-auto">
            <label className="form-label text-light me-2">
              Alert when reaching (seconds):
            </label>
            <input
              type="number"
              min="0"
              className="form-control d-inline-block w-auto"
              value={alertInput}
              onChange={e => setAlertInput(e.target.value)}
            />
          </div>
          <div className="col-auto d-flex align-items-end">
            <button className="btn btn-outline-info" onClick={handleSetAlert}>
              Set alert
            </button>
          </div>
        </div>

        {/* Stop / resume / reset buttons */}
        <div className="row justify-content-center mt-3">
          <div className="col-auto">
            <button
              className="btn btn-success me-2"
              onClick={onResume}
              disabled={running}
            >
              Resume
            </button>
            <button
              className="btn btn-danger me-2"
              onClick={onStop}
              disabled={!running}
            >
              Stop
            </button>
            <button className="btn btn-secondary" onClick={onReset}>
              Reset (count up from 0)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;