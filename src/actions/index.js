import { START_GAME } from "../constants";

export const startGame = (query) => ({
  type: START_GAME,
  cols: 8,
  rows: 8,
  mines: 12
});
