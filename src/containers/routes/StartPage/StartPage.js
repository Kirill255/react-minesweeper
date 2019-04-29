import React from "react";
import { Link } from "react-router-dom";

import GameOptions from "../../GameOptions/GameOptions";

export default () => {
  return (
    <div>
      <GameOptions />
      <br />
      <div style={{ textAlign: "center" }}>
        <Link to="/game">Start Game</Link>
      </div>
    </div>
  );
};
