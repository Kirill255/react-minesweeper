import React, { Component } from "react";
import { connect } from "react-redux";

import GameStatItem from "../../components/GameStatItem/GameStatItem";

import { getMovesCount } from "../../selectors";

class MovesCount extends Component {
  render() {
    const { moves } = this.props;

    return <GameStatItem label="Moves" stat={moves} />;
  }
}

// переписали на селекторы
// function getMovesCount(state) {
//   return state.getIn(["game", "moves"]);
// }

export default connect((state) => ({
  moves: getMovesCount(state)
}))(MovesCount);
