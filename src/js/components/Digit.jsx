import React from "react";

function Digit({ value }) {
  return (
    <div className="digit-box d-flex align-items-center justify-content-center">
      {value}
    </div>
  );
}

export default Digit;