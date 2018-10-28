import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Calendar from '../calendar/index';
import {priority} from '../../constant';

export default class Forms extends Component {
  state = {
    isShowCalendar: false,
    isOpenAdditionalForms: false
  };

  static propTypes = {
    selectedPriority: PropTypes.string.isRequired,
    todoTitle: PropTypes.string.isRequired,
    onClickPriorityBtn: PropTypes.func.isRequired,
    onClickAddBtn: PropTypes.func.isRequired,
    onChangeTodoTitle: PropTypes.func.isRequired,
    base: PropTypes.number.isRequired,
    selectedDate: PropTypes.number.isRequired,
    moveToMonth: PropTypes.func.isRequired,
    updateSelectedDate: PropTypes.func.isRequired
  };

  toggleIsOpenAdditionalForms = () => {
    this.setState((prevState) => ({
      isOpenAdditionalForms: !prevState.isOpenAdditionalForms
    }));
  };

  toggleCalendar = () => {
    this.setState((prevState) => ({
      isShowCalendar: !prevState.isShowCalendar
    }));
  };

  getLabelArea = () => {
    const {selectedPriority, onClickPriorityBtn} = this.props;

    return (
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
    );
  };

  renderInputArea = () => {
    const {isOpenAdditionalForms} = this.state;
    const {todoTitle, onClickAddBtn, onChangeTodoTitle} = this.props;

    return (
      <div className="forms-area">
        <button
          onClick={this.toggleIsOpenAdditionalForms}
          className={`forms-area-btn additional-forms ${isOpenAdditionalForms ? 'opened' : ''}`}
        />
        <input type="text" name="todo" value={todoTitle} onChange={onChangeTodoTitle} className="forms-area-input" />
        <button onClick={onClickAddBtn} className="forms-area-btn submit" />
      </div>
    );
  };

  getCalendarArea = () => {
    const {base, selectedDate, updateSelectedDate, moveToMonth} = this.props;

    return (
      <div className="forms-calendar-area">
        {/*<button onClick={this.toggleCalendar} className="calendar-show-btn">달력</button>*/}
        <Calendar
          isShowCalendar={this.state.isShowCalendar}
          base={base}
          selectedDate={selectedDate}
          updateSelectedDate={updateSelectedDate}
          moveToMonth={moveToMonth}
        />
      </div>
    );
  };

  render() {
    const {isOpenAdditionalForms} = this.state;

    return (
      <section className={`forms-container ${isOpenAdditionalForms ? 'opened' : 'closed'}`}>
        {this.renderInputArea()}
        <div className="forms-option-area">
          {this.getLabelArea()}
          {this.getCalendarArea()}
        </div>
      </section>
    );
  }
}
