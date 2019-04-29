import React from "react";
import { Link } from "react-router-dom";

import "./RestartGame.css";

export default (props) => {
  return (
    <div className="restart-game">
      <button className="restart-game__button" type="button" onClick={props.restartGame}>
        &#x21bb; Restart
      </button>
      <br />
      <div>
        <Link to="/start">Back to Start Page</Link>
      </div>
    </div>
  );
};
