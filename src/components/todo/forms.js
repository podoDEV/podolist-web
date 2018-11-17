import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Calendar from '../calendar/index';
import {keyCodeMap, priority} from '../../constant';
import {
  changeTodoTitle,
  changeTodoPriority,
  changeSelectedDate,
  changeDateBase,
  clearForms,
  setIsOpenAdditionalForms
} from '../../actions/forms';
import {createTodo, updateTodo} from '../../actions/todo';
import moment from 'moment/moment';

class Forms extends Component {
  static propTypes = {
    changeTodoPriority: PropTypes.func.isRequired,
    changeTodoTitle: PropTypes.func.isRequired,
    changeSelectedDate: PropTypes.func.isRequired,
    setIsOpenAdditionalForms: PropTypes.func.isRequired,
    base: PropTypes.number.isRequired,
    title: PropTypes.string,
    isOpenAdditionalForms: PropTypes.bool,
    selectedDate: PropTypes.number,
    changeDateBase: PropTypes.func.isRequired,
    createTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    priority: PropTypes.string,
    editId: PropTypes.number,
    clearForms: PropTypes.func
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDownEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownEvent);
  }

  handleKeyDownEvent = (ev) => {
    const {title, isOpenAdditionalForms} = this.props;

    if (ev.keyCode === keyCodeMap.ESC) {
      this.closeAdditionalForms();
    } else if (ev.keyCode === keyCodeMap.ENTER && isOpenAdditionalForms && title) {
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
    this.props.clearForms();
    this.props.setIsOpenAdditionalForms(false);
  };

  openAdditionalForms = () => {
    this.props.setIsOpenAdditionalForms(true);
  };

  handleClickAddButton = () => {
    const {title, priority, selectedDate, base, clearForms, createTodo, editId, updateTodo} = this.props;

    let time = moment()
      .set('date', selectedDate)
      .add(base, 'M')
      .format('YYYY-MM-DD');

    if (title) {
      if (editId === -1) {
        createTodo({
          title,
          priority,
          endedAt: moment(time).unix(),
          startedAt: moment(time).unix()
        });
      } else {
        updateTodo(editId, {
          title,
          priority,
          endedAt: moment(time).unix(),
          startedAt: moment(time).unix()
        });
      }

      this.closeAdditionalForms();
      clearForms();
    }
  };

  getLabelArea = () => {
    const {priority: selectedPriority, changeTodoPriority} = this.props;

    return (
      <div className="priority-label">
        <button
          className={selectedPriority === priority.URGENT ? this.getPriorityBg(priority.URGENT) : 'not-selected'}
          onClick={() => changeTodoPriority(priority.URGENT)}
        >
          매우 중요
        </button>
        <button
          className={selectedPriority === priority.HIGH ? this.getPriorityBg(priority.HIGH) : 'not-selected'}
          onClick={() => changeTodoPriority(priority.HIGH)}
        >
          중요
        </button>
        <button
          className={selectedPriority === priority.MEDIUM ? this.getPriorityBg(priority.MEDIUM) : 'not-selected'}
          onClick={() => changeTodoPriority(priority.MEDIUM)}
        >
          보통
        </button>
        <button
          className={selectedPriority === priority.LOW ? this.getPriorityBg(priority.LOW) : 'not-selected'}
          onClick={() => changeTodoPriority(priority.LOW)}
        >
          여유
        </button>
        <button
          className={selectedPriority === priority.NONE ? this.getPriorityBg(priority.NONE) : 'not-selected'}
          onClick={() => changeTodoPriority(priority.NONE)}
        >
          그냥
        </button>
      </div>
    );
  };

  renderInputArea = () => {
    const {title, changeTodoTitle, priority, isOpenAdditionalForms, editId} = this.props;
    const isEdit = editId !== -1;

    return (
      <div className="forms-area">
        <button
          className={`forms-area-btn additional-forms ${isOpenAdditionalForms ? 'opened' : ''}`}
          onClick={isOpenAdditionalForms ? this.closeAdditionalForms : this.openAdditionalForms}
        />
        {isOpenAdditionalForms && <div className={`showing-label-div ${this.getPriorityBorder(priority)}`} />}
        <input
          type="text"
          name="todo"
          value={title}
          onChange={(ev) => changeTodoTitle(ev.target.value)}
          className="forms-area-input"
          onFocus={this.openAdditionalForms}
        />
        <button onClick={this.handleClickAddButton} className={`forms-area-btn ${isEdit ? 'edit' : 'submit'}`} />
      </div>
    );
  };

  getCalendarArea = () => {
    const {base, changeDateBase, changeSelectedDate, selectedDate} = this.props;

    return (
      <div className="forms-calendar-area">
        <Calendar
          base={base}
          selectedDate={selectedDate}
          changeDateBase={changeDateBase}
          changeSelectedDate={changeSelectedDate}
        />
      </div>
    );
  };

  render() {
    const {isOpenAdditionalForms} = this.props;

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

const mapStateToProps = (state) => {
  const {
    forms: {
      selectedPriority,
      base,
      selectedDate,
      todoTitle: title,
      selectedPriority: priority,
      isOpenAdditionalForms,
      editId
    }
  } = state;

  return {
    title,
    selectedPriority,
    selectedDate,
    base,
    priority,
    isOpenAdditionalForms,
    editId
  };
};

const mapDispatchToProps = {
  changeTodoTitle,
  changeTodoPriority,
  changeSelectedDate,
  changeDateBase,
  clearForms,
  createTodo,
  updateTodo,
  setIsOpenAdditionalForms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forms);
