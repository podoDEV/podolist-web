export const CHANGE_TODAY_DATE = 'CHANGE_TODAY_DATE';
export const CHANGE_TODAY_BASE = 'CHANGE_TODAY_BASE';
export const CHANGE_TODAY_DATE_SAGA = 'CHANGE_TODAY_DATE_SAGA';
export const CHANGE_TODAY_BASE_SAGA = 'CHANGE_TODAY_BASE_SAGA';

export const changeTodayDate = (selectedDate) => ({
  type: CHANGE_TODAY_DATE,
  selectedDate
});

export const changeTodayBase = (months) => ({
  type: CHANGE_TODAY_BASE,
  months
});

export const changeTodayDateSaga = (selectedDate) => ({
  type: CHANGE_TODAY_DATE_SAGA,
  selectedDate
});

export const changeTodayBaseSaga = (months) => ({
  type: CHANGE_TODAY_BASE_SAGA,
  months
});
