import React, { Component } from "react";
import { connect } from "react-redux";

import { getCols, getMines } from "../../selectors";
import { changeFieldSize, changeMinesCount } from "../../actions";

class GameOptions extends Component {
  onChangeFieldSize = (e) => {
    this.props.changeFieldSize(+e.target.value);
  };
  onChangeMinesCount = (e) => {
    this.props.changeMinesCount(+e.target.value);
  };

  render() {
    return (
      <div>
        <select defaultValue={this.props.size} onChange={this.onChangeFieldSize}>
          <option disabled>Размер поля:</option>
          <option value={8}>8x8</option>
          <option value={10}>10x10</option>
          <option value={12}>12x12</option>
        </select>
        <select defaultValue={this.props.count} onChange={this.onChangeMinesCount}>
          <option disabled>Кол-во мин:</option>
          <option value={8}>8 мин</option>
          <option value={12}>12 мин</option>
          <option value={16}>16 мин</option>
        </select>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    size: getCols(state),
    count: getMines(state)
  }),
  { changeFieldSize, changeMinesCount }
)(GameOptions);
