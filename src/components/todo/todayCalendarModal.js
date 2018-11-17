import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Calendar from '../calendar';
import {changeTodayDate, changeTodayBase} from '../../actions/today';

class TodayCalendarModal extends Component {
  static propTypes = {
    base: PropTypes.number.isRequired,
    selectedDate: PropTypes.number,
    changeTodayBase: PropTypes.func.isRequired,
    changeTodayDate: PropTypes.func.isRequired,
    openTodayCalendarModal: PropTypes.bool.isRequired,
    setOpenTodayCalendarModal: PropTypes.func.isRequired
  };

  handleClickBackground = (ev) => {
    ev.preventDefault();
    this.props.setOpenTodayCalendarModal(false);
  };

  render() {
    const {base, changeTodayBase, changeTodayDate, selectedDate, openTodayCalendarModal} = this.props;

    return (
      <div
        className={`dimmed-calendar-modal-area ${openTodayCalendarModal ? 'opened' : ''}`}
        onClick={(ev) => this.handleClickBackground(ev)}
      >
        <Calendar
          base={base}
          selectedDate={selectedDate}
          changeDateBase={changeTodayBase}
          changeSelectedDate={changeTodayDate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  base: state.today.base,
  selectedDate: state.today.selectedDate
});

const mapDispatchToProps = {
  changeTodayDate,
  changeTodayBase
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodayCalendarModal);
