import React, { Component } from "react";
import { connect } from "react-redux";

import GameStatItem from "../../components/GameStatItem/GameStatItem";

import { getMinesLeft } from "../../selectors";

class MinesLeftCount extends Component {
  render() {
    const { mines } = this.props;

    return <GameStatItem label="Mines left" stat={mines} />;
  }
}

// переписали на селекторы
// function getMinesLeft(state) {
//   return (
//     state.getIn(["game", "mines"]) -
//     state
//       .getIn(["game", "board"])
//       .reduce((minesLeft, tile) => (tile.get("isFlagged") ? minesLeft + 1 : minesLeft), 0)
//   );
// }

export default connect((state) => ({
  mines: getMinesLeft(state)
}))(MinesLeftCount);
