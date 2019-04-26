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
  console.log(addMineCounts(game));

  return addMineCounts(game);
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

// добавляем кол-во мин вокруг каждой ячейки
export function addMineCounts(game) {
  const newBoard = game
    .get("board")
    .map((tile) => tile.set("mineCount", getMineCount(game, tile.get("id"))));

  return game.set("board", newBoard);
}

export function getMineCount(game, tileId) {
  const adjacentTiles = getAdjacentTiles(game, tileId);

  return adjacentTiles.filter(isTileMine).size;
}

export function isTileMine(tile) {
  return tile.get("isMine");
}

export function getAdjacentTiles(game, tileId) {
  const adjacentTileIds = getAdjacentTileIds(game, tileId);

  return adjacentTileIds.map((id) => game.getIn(["board", id]));
}

export function getAdjacentTileIds(game, tileId) {
  return directions
    .map((direction) => direction(game, tileId))
    .toList()
    .filter(isTileIdValid);
}

export function isTileIdValid(tileId) {
  return !!tileId;
}

// направление вокруг ячейки похожее на компас https://c7.uihere.com/files/809/294/451/compass-euclidean-vector-compass.jpg
const directions = new Map({
  n: (game, tileId) => getTileId(game, tileId - game.get("cols")),
  nw: (game, tileId) =>
    isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId - game.get("cols") - 1),
  ne: (game, tileId) =>
    isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId - game.get("cols") + 1),
  e: (game, tileId) => (isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId + 1)),
  se: (game, tileId) =>
    isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId + game.get("cols") + 1),
  s: (game, tileId) => getTileId(game, tileId + game.get("cols")),
  sw: (game, tileId) =>
    isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId + game.get("cols") - 1),
  w: (game, tileId) => (isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId - 1))
});

export function getTileId(game, tileId) {
  if (tileId < 0 || tileId > game.get("cols") * game.get("rows") - 1) {
    return null;
  }

  if (game.get("board").has(tileId)) {
    return tileId;
  }

  return null;
}

export function isTileOnWEdge(game, tileId) {
  return tileId % game.get("cols") === 0;
}

export function isTileOnEEdge(game, tileId) {
  return tileId % game.get("cols") === game.get("cols") - 1;
}
