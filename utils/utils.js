import {format} from 'date-fns';
import * as R from 'ramda';

const morning = {
  marked: true,
  color: '#FFC752',
};

const evening = {
  marked: true,
  color: '#00A3F4',
};

const off = {
  marked: false
};

const startingDay = {
  startingDay: true,
};

const endingDay = {
  endingDay: true,
};

const roster = [
  R.merge(morning, startingDay), morning, morning, R.merge(morning, endingDay), off, off, R.merge(evening, startingDay),
  evening, R.merge(evening, endingDay), off, off, R.merge(morning, startingDay), morning, R.merge(morning, endingDay),
  off, R.merge(morning, startingDay), R.merge(morning, endingDay), R.merge(evening, startingDay), R.merge(evening, endingDay), off, off,
];

const START_DATE = 1514728800000;
const DAY = 24 * 3600 * 1000;
const FORMAT = 'YYYY-MM-DD';

const getDuty = (dateTime) => {
  const dayInRoster = Math.floor((dateTime - START_DATE) / DAY) % 21;
  return {
    [format(dateTime, FORMAT)]: roster[dayInRoster]
  };
};

export const getRosterForWeeks = (weeks) => {
  let markedDates = [];
  for (let i = 0; i < weeks * 7; i++) {
    const date = START_DATE + DAY * i;
    markedDates.push(getDuty(date));
  }
  return R.mergeAll(markedDates);
};
