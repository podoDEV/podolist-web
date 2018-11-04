import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Calendar from '../calendar/index';
import {keyCodeMap, priority} from '../../constant';

export default class Forms extends Component {
  state = {
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDownEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownEvent);
  }

  handleKeyDownEvent = (ev) => {
    const {isOpenAdditionalForms} = this.state;
    const {todoTitle} = this.props;

    if (ev.keyCode === keyCodeMap.ESC) {
      this.closeAdditionalForms();
    } else if (ev.keyCode === keyCodeMap.ENTER && isOpenAdditionalForms && todoTitle) {
      this.handleClickAddButton();
    }
  };

  getPriorityBg = (pr) => {
    return `${pr.toLowerCase()}-bg`;
  };

  getPriorityBorder = (pr) => {
    return `${pr.toLowerCase()}-border`;
  };

  closeAdditionalForms = () => {
    this.setState({isOpenAdditionalForms: false});
  };

  openAdditionalForms = () => {
    this.setState({isOpenAdditionalForms: true});
  };

  handleClickAddButton = () => {
    this.closeAdditionalForms();
    this.props.onClickAddBtn();
  };

  getLabelArea = () => {
    const {selectedPriority, onClickPriorityBtn} = this.props;

    return (
      <div className="priority-label">
        <button
          className={selectedPriority === priority.URGENT ? this.getPriorityBg(priority.URGENT) : 'not-selected'}
          onClick={() => onClickPriorityBtn(priority.URGENT)}
        >
          매우 중요
        </button>
        <button
          className={selectedPriority === priority.HIGH ? this.getPriorityBg(priority.HIGH) : 'not-selected'}
          onClick={() => onClickPriorityBtn(priority.HIGH)}
        >
          중요
        </button>
        <button
          className={selectedPriority === priority.MEDIUM ? this.getPriorityBg(priority.MEDIUM) : 'not-selected'}
          onClick={() => onClickPriorityBtn(priority.MEDIUM)}
        >
          보통
        </button>
        <button
          className={selectedPriority === priority.LOW ? this.getPriorityBg(priority.LOW) : 'not-selected'}
          onClick={() => onClickPriorityBtn(priority.LOW)}
        >
          여유
        </button>
        <button
          className={selectedPriority === priority.NONE ? this.getPriorityBg(priority.NONE) : 'not-selected'}
          onClick={() => onClickPriorityBtn(priority.NONE)}
        >
          그냥
        </button>
      </div>
    );
  };

  renderInputArea = () => {
    const {isOpenAdditionalForms} = this.state;
    const {todoTitle, onChangeTodoTitle, selectedPriority} = this.props;

    return (
      <div className="forms-area">
        <button
          className={`forms-area-btn additional-forms ${isOpenAdditionalForms ? 'opened' : ''}`}
          onClick={isOpenAdditionalForms ? this.closeAdditionalForms : this.openAdditionalForms}
        />
        {isOpenAdditionalForms && <div className={`showing-label-div ${this.getPriorityBorder(selectedPriority)}`} />}
        <input
          type="text"
          name="todo"
          value={todoTitle}
          onChange={onChangeTodoTitle}
          className="forms-area-input"
          onFocus={this.openAdditionalForms}
        />
        <button onClick={this.handleClickAddButton} className="forms-area-btn submit" />
      </div>
    );
  };

  getCalendarArea = () => {
    const {base, selectedDate, updateSelectedDate, moveToMonth} = this.props;

    return (
      <div className="forms-calendar-area">
        <Calendar
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
      <React.Fragment>
        <div className={`dimmed-area ${isOpenAdditionalForms ? 'opened' : 'closed'}`} />
        <section className={`forms-container ${isOpenAdditionalForms ? 'opened' : 'closed'}`}>
          {this.renderInputArea()}
          <div className="forms-option-area">
            <p className="option-title">중요도 설정</p>
            {this.getLabelArea()}
            <p className="option-title">날짜</p>
            {this.getCalendarArea()}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
