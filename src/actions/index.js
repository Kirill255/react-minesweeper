import {
  START_GAME,
  CHANGE_FIELD_SIZE,
  CHANGE_MINES_COUNT,
  TOGGLE_FLAGGED_TILE,
  REVEAL_TILE
} from "../constants";

export const startGame = () => ({
  type: START_GAME
});

export const changeFieldSize = (size) => ({
  type: CHANGE_FIELD_SIZE,
  size
});

export const changeMinesCount = (count) => ({
  type: CHANGE_MINES_COUNT,
  count
});

export const revealTile = (tileId) => ({
  type: REVEAL_TILE,
  tileId
});

export const toggleFlaggedTile = (tileId) => ({
  type: TOGGLE_FLAGGED_TILE,
  tileId
});
