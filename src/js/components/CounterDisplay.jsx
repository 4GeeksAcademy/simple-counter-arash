import React from "react";
import Digit from "./Digit.jsx";

function CounterDisplay({ seconds, secondsSinceLoad }) {
  // tabdil kon adad ro b 6 digit string: 0 -> "000000", 45 -> "000045"
  const padded = String(seconds).padStart(6, "0"); //convert the number into string.string always has 6 charectors,the left of thr number if it was nothing put '0'
  const digits = padded.split(""); //turn the string to array

  return (
    <div className="counter-wrapper d-flex flex-column align-items-center justify-content-center">
      <h1 className="mb-4 text-secondary">Simple Counter</h1>

      <div className="d-flex">
        {/* All 6 digits generated from the "digits" array */}
        {digits.map((d, index) => (
          <Digit key={index} value={d} />
        ))}
      </div>

      <p className="mt-3 text-secondary">
        Seconds since load: <span className="text-secondary">{secondsSinceLoad}</span>
      </p>
    </div> //print the seconds number
  );
}

export default CounterDisplay;