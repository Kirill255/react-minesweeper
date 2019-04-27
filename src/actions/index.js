import { START_GAME, TOGGLE_FLAGGED_TILE, REVEAL_TILE } from "../constants";

export const startGame = (query) => ({
  type: START_GAME,
  cols: 8,
  rows: 8,
  mines: 12
});

export const revealTile = (tileId) => ({
  type: REVEAL_TILE,
  tileId
});

export const toggleFlaggedTile = (tileId) => ({
  type: TOGGLE_FLAGGED_TILE,
  tileId
});
