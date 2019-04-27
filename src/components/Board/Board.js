import React from "react";

import Tile from "../Tile/Tile";

import "./Board.css";

export default (props) => {
  const { rows } = props;

  return (
    <div className="board">
      {rows.map((row, idx) => (
        <div key={idx} className="board__row">
          {row.map((tile) => (
            <Tile
              key={tile.get("id")}
              id={tile.get("id")}
              mineCount={tile.get("mineCount")}
              isMine={tile.get("isMine")}
              isRevealed={tile.get("isRevealed")}
              isFlagged={tile.get("isFlagged")}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
