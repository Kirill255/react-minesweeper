import { fromJS, Map } from "immutable";

import repeat from "./repeat";

export function startGame(params) {
  const game = fromJS({
    cols: params.cols,
    rows: params.rows,
    mines: params.mines,
    board: generateBoard(params),
    moves: 0,
    startedAt: Date.now()
  });
  console.log(game);

  return game;
}

export function generateBoard({ cols, rows, mines }) {
  // ячейка в общем виде (безопасные)
  const cell = Map({ isRevealed: false, isFlagged: false });

  const safeCells = repeat(cols * rows - mines, cell);
  const mineCells = repeat(mines, cell.set("isMine", true)); // у ячеек с минами есть поле isMine: true

  // создали массив с ячейками(безопасными и с минами), перемешали и добавили id'шники каждой ячейке
  return safeCells
    .concat(mineCells)
    .sort(() => Math.random() - 0.5)
    .map((tile, idx) => tile.set("id", idx));
}
