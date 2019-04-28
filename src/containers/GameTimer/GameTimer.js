import React, { Component } from "react";
import { connect } from "react-redux";

import GameStatItem from "../../components/GameStatItem/GameStatItem";

import { getStartTime, getGameStatus } from "../../selectors";

class GameTimer extends Component {
  componentDidMount() {
    this.timer = setInterval(() => this.forceUpdate(), 500);
  }

  componentWillReceiveProps(nextProps) {
    // при рестарте игры приходит новое время
    if (nextProps.startTime !== this.props.startTime) {
      // очищаем старый таймер
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => this.forceUpdate(), 500);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // останавливаем таймер когда победа/проигрыш
    if (this.props.status !== "PLAYING") {
      clearInterval(this.timer);
    }
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
  startTime: getStartTime(state),
  status: getGameStatus(state)
}))(GameTimer);
