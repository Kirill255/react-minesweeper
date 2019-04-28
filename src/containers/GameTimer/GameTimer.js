import React, { Component } from "react";
import { connect } from "react-redux";

import GameStatItem from "../../components/GameStatItem/GameStatItem";

import { getStartTime } from "../../selectors";

class GameTimer extends Component {
  componentDidMount() {
    this.timer = setInterval(() => this.forceUpdate(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { startTime } = this.props;
    const timeInSeconds = Math.round((Date.now() - startTime) / 1000);

    return <GameStatItem label="Seconds" stat={timeInSeconds} />;
  }
}

// переписали на селекторы
// function getStartTime(state) {
//   return state.getIn(["game", "startedAt"]);
// }

export default connect((state) => ({
  startTime: getStartTime(state)
}))(GameTimer);
