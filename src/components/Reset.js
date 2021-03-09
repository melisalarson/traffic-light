import React from "react";

const Reset = (props) => {
  return (
    <button className="reset" onClick={() => props.handleReset()}>
      start over
    </button>
  );
};

export default Reset;
