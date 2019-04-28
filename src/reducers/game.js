import { initialState, startGame, revealTile, flagTile } from "../utils/minesweeper";
import { START_GAME, TOGGLE_FLAGGED_TILE, REVEAL_TILE } from "../constants";

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
