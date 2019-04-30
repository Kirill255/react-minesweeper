import { fromJS, Map } from "immutable";

import repeat from "./repeat";

/*
Сдесь три основные функции (startGame, flagTile, revealTile), а остальные вспомогательные
*/

export const initialState = fromJS({
  cols: 8,
  rows: 8,
  mines: 12,
  board: [],
  moves: 0,
  startedAt: null
});

// старт игры
export function startGame(game) {
  const params = {
    cols: game.get("cols"),
    rows: game.get("rows"),
    mines: game.get("mines")
  };

  const newGame = game.set("board", generateBoard(params)).set("startedAt", Date.now());

  return addMineCounts(newGame);
}

export function changeFieldSize(game, size) {
  const updatedGame = game.set("cols", size).set("rows", size);
  return updatedGame;
}
export function changeMinesCount(game, count) {
  const updatedGame = game.set("mines", count);
  return updatedGame;
}

export function generateBoard({ cols, rows, mines }) {
  // ячейка в общем виде (безопасные)
  const cell = Map({ isRevealed: false, isFlagged: false });

  const safeCells = repeat(cols * rows - mines, cell);
  const mineCells = repeat(mines, cell.set("isMine", true)); // у ячеек с минами есть поле isMine: true

  // создали массив с ячейками(безопасными и с минами), перемешали и добавили id'шники каждой ячейке
  return shuffle(safeCells.concat(mineCells)).map((tile, idx) => tile.set("id", idx));
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

// ставим флажки(ПКМ) чтобы разминировать бомбы, просто меняем у ячейки значение isFlagged
export function flagTile(game, tileId) {
  return game.setIn(["board", tileId, "isFlagged"], !game.getIn(["board", tileId, "isFlagged"]));
}

// открываем ячейки, увеличиваем кол-во ходов и отмечаем что ячейка открыта isRevealed, дальше проверяем, если в ячейке мина -> то нужно завершить игру(открыть все мины), иначе нужно открыть все безопасные ячейки вокруг
export function revealTile(game, tileId) {
  const updatedGame = game
    .set("moves", game.get("moves") + 1)
    .setIn(["board", tileId, "isRevealed"], true);

  return updatedGame.getIn(["board", tileId, "isMine"])
    ? revealAllMines(updatedGame)
    : revealAdjacentSafeTiles(updatedGame, tileId);
}

export function revealAllMines(game) {
  // проходим по всем ячейкам, и если в ячейке мина, то открываем её isRevealed: true
  const newBoard = game
    .get("board")
    .map((tile) => (tile.get("isMine") ? tile.set("isRevealed", true) : tile));

  return game.set("board", newBoard);
}

export function revealAdjacentSafeTiles(game, tileId) {
  // выход из рекурсии, если мы наткнулись на мину, то перестаём открывать ячейки, возвращаем игру
  if (game.getIn(["board", tileId, "isMine"])) {
    return game;
  }

  // если ячейка котрую мы открываем — пустая, тоесть вокруг нет мин, запускаем рекурсию
  if (game.getIn(["board", tileId, "mineCount"]) === 0) {
    const adjacentTileIds = getAdjacentTileIds(game, tileId);

    return adjacentTileIds.reduce((newGame, tileId) => {
      const isRevealed = newGame.getIn(["board", tileId, "isRevealed"]);

      return isRevealed ? newGame : revealAdjacentSafeTiles(newGame, tileId);
    }, setTileRevealed(game, tileId));
  }

  // если ячейка непустая, просто открываем её и всё
  return setTileRevealed(game, tileId);
}

export function setTileRevealed(game, tileId) {
  return game.setIn(["board", tileId, "isRevealed"], true);
}

// https://github.com/tkloht/immutable-shuffle не стал устанавливать через npm, скопировал функцию прямо в код
function shuffle(list) {
  const shuffled = list.withMutations((mutableList) => {
    let currentItem = mutableList.size;
    let tmp = null;
    let swappedItem = null;
    while (currentItem) {
      // Pick a remaining element…
      swappedItem = Math.floor(Math.random() * currentItem--);
      // Swap with current element
      tmp = mutableList.get(currentItem);
      mutableList.set(currentItem, mutableList.get(swappedItem));
      mutableList.set(swappedItem, tmp);
    }
  });

  return shuffled;
}
