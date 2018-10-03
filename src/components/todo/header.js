import React, {Component} from 'react';
import {showOptions} from '../../constant';
import PropTypes from 'prop-types';

const {ALL, FINISHED, UNFINISHED} = showOptions;

export default class Header extends Component {
  static propTypes = {
    onChangeFilter: PropTypes.func,
    showOption: PropTypes.string
  };

  render() {
    const {onChangeFilter, showOption} = this.props;

    return (
      <header className="todo-header">
        <div className="filter-area">
          <button className={`filter-btn ${showOption === ALL ? 'active' : ''}`} onClick={() => onChangeFilter(ALL)}>
            전체
          </button>
          <button
            className={`filter-btn ${showOption === UNFINISHED ? 'active' : ''}`}
            onClick={() => onChangeFilter(UNFINISHED)}
          >
            미완료
          </button>
          <button
            className={`filter-btn ${showOption === FINISHED ? 'active' : ''}`}
            onClick={() => onChangeFilter(FINISHED)}
          >
            완료
          </button>
        </div>
        <ul className="date">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li className="selected">4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
        </ul>
      </header>
    );
  }
}
