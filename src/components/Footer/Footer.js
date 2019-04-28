import React from "react";

import MinesLeftCount from "../../containers/MinesLeftCount/MinesLeftCount";
import MovesCount from "../../containers/MovesCount/MovesCount";
import GameTimer from "../../containers/GameTimer/GameTimer";

import "./Footer.css";

export default (props) => {
  return (
    <div className="footer">
      <MinesLeftCount />
      <MovesCount />
      <GameTimer />
    </div>
  );
};
