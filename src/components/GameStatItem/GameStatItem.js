import React from "react";

import "./GameStatItem.css";

export default (props) => {
  const { label, stat } = props;

  return (
    <div className="game-stat__item">
      <div className="game-stat__label">{stat}</div>
      <div className="game-stat__stat">{label}</div>
    </div>
  );
};
