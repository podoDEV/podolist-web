import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {priority} from '../../constant';

export default class Forms extends Component {
  static propTypes = {
    selectedPriority: PropTypes.string.isRequired,
    todoTitle: PropTypes.string.isRequired,
    onClickPriorityBtn: PropTypes.func.isRequired,
    onClickAddBtn: PropTypes.func.isRequired,
    onChangeTodoTitle: PropTypes.func.isRequired
  };

  render() {
    const {selectedPriority, todoTitle, onClickPriorityBtn, onClickAddBtn, onChangeTodoTitle} = this.props;

    return (
      <section className="forms-section">
        <div className="priority-label">
          <button
            className={selectedPriority === priority.URGENT ? priority.URGENT : 'not-selected'}
            onClick={() => onClickPriorityBtn(priority.URGENT)}
          >
            매우 중요
          </button>
          <button
            className={selectedPriority === priority.HIGH ? priority.HIGH : 'not-selected'}
            onClick={() => onClickPriorityBtn(priority.HIGH)}
          >
            중요
          </button>
          <button
            className={selectedPriority === priority.MEDIUM ? priority.MEDIUM : 'not-selected'}
            onClick={() => onClickPriorityBtn(priority.MEDIUM)}
          >
            보통
          </button>
          <button
            className={selectedPriority === priority.LOW ? priority.LOW : 'not-selected'}
            onClick={() => onClickPriorityBtn(priority.LOW)}
          >
            여유
          </button>
        </div>
        <div className="forms-area">
          <input type="text" name="todo" value={todoTitle} onChange={onChangeTodoTitle} className="forms-area-input" />
          <button onClick={onClickAddBtn} className="forms-area-btn" />
        </div>
      </section>
    );
  }
}
