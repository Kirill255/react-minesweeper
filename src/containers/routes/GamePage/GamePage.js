import React, { Component } from "react";
import { connect } from "react-redux";

import { startGame } from "../../../actions";

class GamePage extends Component {
  componentDidMount() {
    this.props.startGame();
  }

  render() {
    return (
      <div>
        <h1>GamePage</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { startGame }
)(GamePage);
