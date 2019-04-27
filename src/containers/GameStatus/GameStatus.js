import React, { Component } from "react";
import { connect } from "react-redux";

import EmojiStatus from "../../components/EmojiStatus/EmojiStatus";

import { getGameStatus } from "../../selectors";

const statusEmojis = {
  LOOSER: "dizzy-face",
  WINNER: "sunglasses",
  PLAYING: "smiley"
};

class GameStatus extends Component {
  render() {
    const { status } = this.props;

    return <EmojiStatus mapper={statusEmojis} status={status} />;
  }
}

// переписали на селекторы
// function getGameStatus(state) {
//   const isWinner = state
//     .getIn(["game", "board"])
//     .reduce(
//       (status, tile) => (tile.get("isMine") ? status : status && tile.get("isRevealed")),
//       true
//     );

//   if (isWinner) {
//     return "WINNER";
//   }

//   const isLooser = state
//     .getIn(["game", "board"])
//     .reduce(
//       (status, tile) => (tile.get("isMine") ? status && tile.get("isRevealed") : status),
//       true
//     );

//   if (isLooser) {
//     return "LOOSER";
//   }

//   return "PLAYING";
// }

export default connect((state) => ({
  status: getGameStatus(state)
}))(GameStatus);
