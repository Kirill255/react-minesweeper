import React, { Component } from "react";
import { connect } from "react-redux";

import GameBoard from "../../GameBoard/GameBoard";
import GameStatus from "../../GameStatus/GameStatus";
import Footer from "../../../components/Footer/Footer";

import { startGame } from "../../../actions";

class GamePage extends Component {
  componentDidMount() {
    this.props.startGame();
  }

  render() {
    return (
      <div>
        <GameStatus />
        <GameBoard />
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { startGame }
)(GamePage);
