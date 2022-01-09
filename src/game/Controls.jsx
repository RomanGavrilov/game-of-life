
import React from "react";
import './Controls.css';

export default function Controls(props) {
  return (
    <React.Fragment>
      <button onClick={props.start}>Start</button>
      <button onClick={props.pause}>Pause</button>
      <button onClick={props.clear}>Clear</button>
    </React.Fragment>
  );
}
