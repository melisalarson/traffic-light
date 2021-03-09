import React from "react";

const Mode = (props) => {
  return (
    <div className="mode">
      <button id="driving" onClick={() => props.handleMode("driving")}>
        DRIVING MODE
      </button>
      <button id="random" onClick={() => props.handleMode("random")}>
        RANDOM MODE
      </button>
    </div>
  );
};

export default Mode;
