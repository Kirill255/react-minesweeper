import { fromJS } from "immutable";

import { startGame } from "../utils/minesweeper";
import { START_GAME } from "../constants";

const initialState = fromJS({
  board: [],
  cols: 4,
  rows: 6,
  mines: 10,
  moves: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      const { rows, cols, mines } = action;

      return startGame({ rows, cols, mines });

    default:
      return state;
  }
};
