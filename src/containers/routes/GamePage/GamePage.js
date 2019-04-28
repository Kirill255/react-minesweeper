import React, { Component } from "react";
import { connect } from "react-redux";

import RestartGame from "../../../components/RestartGame/RestartGame";
import GameBoard from "../../GameBoard/GameBoard";
import GameStatus from "../../GameStatus/GameStatus";
import Footer from "../../../components/Footer/Footer";

import { startGame } from "../../../actions";
import { getGameStatus } from "../../../selectors";

class GamePage extends Component {
  componentDidMount() {
    this.props.startGame();
  }

  render() {
    return (
      <div>
        {this.props.status !== "PLAYING" && <RestartGame restartGame={this.props.startGame} />}
        <GameStatus />
        <GameBoard />
        <Footer />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    status: getGameStatus(state)
  }),
  { startGame }
)(GamePage);
