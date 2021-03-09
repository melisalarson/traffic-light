import React from "react";

const TrafficLight = (props) => {
  return (
    <div className="frame" onClick={() => props.handleStart()}>
      <div className="circles" id="red"></div>
      <div className="circles" id="yellow"></div>
      <div className="circles" id="green"></div>
    </div>
  );
};

export default TrafficLight;
