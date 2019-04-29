import {
  initialState,
  startGame,
  changeFieldSize,
  changeMinesCount,
  revealTile,
  flagTile
} from "../utils/minesweeper";

import {
  START_GAME,
  CHANGE_FIELD_SIZE,
  CHANGE_MINES_COUNT,
  TOGGLE_FLAGGED_TILE,
  REVEAL_TILE
} from "../constants";

export default (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      // const { rows, cols, mines } = action;

      // return startGame({ rows, cols, mines });
      return startGame(state);

    case CHANGE_FIELD_SIZE:
      return changeFieldSize(state, action.size); // по сути, в state у нас наша игра(game)

    case CHANGE_MINES_COUNT:
      return changeMinesCount(state, action.count);

    case REVEAL_TILE:
      return revealTile(state, action.tileId);

    case TOGGLE_FLAGGED_TILE:
      return flagTile(state, action.tileId);

    default:
      return state;
  }
};
