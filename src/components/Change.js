import React from "react";

const Change = (props) => {
  return (
    <button className="change" onClick={() => props.handleChange()}>
      Change!
    </button>
  );
};

export default Change;
