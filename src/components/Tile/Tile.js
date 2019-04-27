import React, { Component } from "react";

import Emoji from "../Emoji";

import "./Tile.css";

const emojiNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];

export default class Tile extends Component {
  getTileEmoji() {
    const { isMine, isFlagged, mineCount } = this.props;

    if (isFlagged) {
      return "triangular-flag-on-post";
    }

    if (isMine) {
      return "bomb";
    }

    if (mineCount) {
      return emojiNumbers[mineCount];
    }

    if (!mineCount) {
      return "ghost";
    }

    return "white-large-square";
  }

  render() {
    return (
      <span className="tile">
        <Emoji size={40} type={this.getTileEmoji()} />
      </span>
    );
  }
}
