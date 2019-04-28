import { fromJS } from "immutable";

import { startGame, revealTile, flagTile } from "../utils/minesweeper";
import { START_GAME, TOGGLE_FLAGGED_TILE, REVEAL_TILE } from "../constants";

const initialState = fromJS({
  board: [],
  cols: 4,
  rows: 6,
  mines: 10,
  moves: 0,
  startedAt: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      const { rows, cols, mines } = action;

      return startGame({ rows, cols, mines });

    case REVEAL_TILE:
      return revealTile(state, action.tileId); // по сути, в state у нас наша игра(game)

    case TOGGLE_FLAGGED_TILE:
      return flagTile(state, action.tileId); // по сути, в state у нас наша игра(game)

    default:
      return state;
  }
};
