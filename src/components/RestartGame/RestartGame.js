import React from "react";

import "./RestartGame.css";

export default (props) => {
  return (
    <div className="restart-game">
      <button className="restart-game__button" type="button" onClick={props.restartGame}>
        &#x21bb; Restart
      </button>
    </div>
  );
};
