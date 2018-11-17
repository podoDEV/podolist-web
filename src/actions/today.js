export const CHANGE_TODAY_DATE = 'CHANGE_TODAY_DATE';
export const CHANGE_TODAY_BASE = 'CHANGE_TODAY_BASE';

export const changeTodayDate = (selectedDate) => ({
  type: CHANGE_TODAY_DATE,
  selectedDate
});

export const changeTodayBase = (months) => ({
  type: CHANGE_TODAY_BASE,
  months
});
