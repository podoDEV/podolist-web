import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Calendar from '../calendar';
import {changeTodayDateSaga, changeTodayBaseSaga} from '../../actions/today';

class TodayCalendarModal extends Component {
  static propTypes = {
    base: PropTypes.number.isRequired,
    selectedDate: PropTypes.number,
    changeTodayBaseSaga: PropTypes.func.isRequired,
    changeTodayDateSaga: PropTypes.func.isRequired,
    openTodayCalendarModal: PropTypes.bool.isRequired,
    setOpenTodayCalendarModal: PropTypes.func.isRequired
  };

  handleClickBackground = (ev) => {
    ev.preventDefault();
    this.props.setOpenTodayCalendarModal(false);
  };

  render() {
    const {base, changeTodayBaseSaga, changeTodayDateSaga, selectedDate, openTodayCalendarModal} = this.props;

    return (
      <div
        className={`dimmed-calendar-modal-area ${openTodayCalendarModal ? 'opened' : ''}`}
        onClick={(ev) => this.handleClickBackground(ev)}
      >
        <Calendar
          base={base}
          selectedDate={selectedDate}
          changeDateBase={changeTodayBaseSaga}
          changeSelectedDate={changeTodayDateSaga}
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
  changeTodayDateSaga,
  changeTodayBaseSaga
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodayCalendarModal);
