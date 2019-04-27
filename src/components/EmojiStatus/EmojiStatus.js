import React from "react";

import Emoji from "../Emoji";

import "./EmojiStatus.css";

export default (props) => {
  const { status, mapper } = props;

  return (
    <div className="emoji-status">
      <Emoji type={mapper[status]} />
    </div>
  );
};
