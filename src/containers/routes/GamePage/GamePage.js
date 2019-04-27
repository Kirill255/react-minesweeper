import React, { Component } from "react";
import { connect } from "react-redux";

import GameBoard from "../../GameBoard/GameBoard";

import { startGame } from "../../../actions";

class GamePage extends Component {
  componentDidMount() {
    this.props.startGame();
  }

  render() {
    return <GameBoard />;
  }
}

export default connect(
  null,
  { startGame }
)(GamePage);
