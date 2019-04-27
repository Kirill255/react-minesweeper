import { createSelector } from "reselect";
import { List } from "immutable";

export const getGame = (state) => state.get("game");

export const getBoard = createSelector(
  getGame,
  (game) => game.get("board")
);

export const getCols = createSelector(
  getGame,
  (game) => game.get("cols")
);

export const getMines = createSelector(
  getGame,
  (game) => game.get("mines")
);

export const getGameBoard = createSelector(
  getBoard,
  getCols,
  (board, cols) => {
    return board.reduce((rows, cell) => {
      const rowIdx = Math.floor(cell.get("id") / cols);
      const row = rows.get(rowIdx);

      return row ? rows.set(rowIdx, row.push(cell)) : rows.push(new List([cell]));
    }, new List());
  }
);

export const getGameStatus = createSelector(
  getBoard,
  getMines,
  (board, mines) => {
    const isWinner = board.reduce(
      (status, tile) => (tile.get("isMine") ? status : status && tile.get("isRevealed")),
      true
    );

    if (isWinner) {
      return "WINNER";
    }

    const isLooser = board.reduce(
      (status, tile) => (tile.get("isMine") ? status && tile.get("isRevealed") : status),
      true
    );

    if (isLooser) {
      return "LOOSER";
    }

    return "PLAYING";
  }
);
