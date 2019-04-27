import React, { Component } from "react";
import { connect } from "react-redux";
// import { List } from "immutable";

import Board from "../../components/Board/Board";

import { getGameBoard } from "../../selectors";
import { revealTile, toggleFlaggedTile } from "../../actions";

class GameBoard extends Component {
  render() {
    const { board, revealTile, toggleFlaggedTile } = this.props;

    return <Board rows={board} onReveal={revealTile} onToggleFlagged={toggleFlaggedTile} />;
  }
}

// переписали на селекторы
// function getGameBoard(state) {
//   const board = state.getIn(["game", "board"]);
//   const cols = state.getIn(["game", "cols"]);

//   return board.reduce((rows, cell) => {
//     const rowIdx = Math.floor(cell.get("id") / cols);
//     const row = rows.get(rowIdx);

//     return row ? rows.set(rowIdx, row.push(cell)) : rows.push(new List([cell]));
//   }, new List());
// }

export default connect(
  (state) => ({
    board: getGameBoard(state)
  }),
  { revealTile, toggleFlaggedTile }
)(GameBoard);
