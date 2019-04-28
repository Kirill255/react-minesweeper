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

export const getMinesLeft = createSelector(
  getBoard,
  getMines,
  (board, mines) => {
    return (
      mines -
      board.reduce((minesLeft, tile) => (tile.get("isFlagged") ? minesLeft + 1 : minesLeft), 0)
    );

    // или так
    // return mines - board.filter((tile) => tile.get("isFlagged")).size;
  }
);

export const getMovesCount = createSelector(
  getGame,
  (game) => game.get("moves")
);

export const getStartTime = createSelector(
  getGame,
  (game) => game.get("startedAt")
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
  (board) => {
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
