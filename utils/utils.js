import {format} from 'date-fns';
import * as R from 'ramda';

const morning = {
  marked: true,
  color: '#FFC752',
  textColor: 'white',
};

const evening = {
  marked: true,
  color: '#00A3F4',
  textColor: 'white',
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
  const today = new Date().getTime();
  const key = format(dateTime, FORMAT);
  const value = roster[dayInRoster];
  if (format(today, FORMAT) === key) {
    return {
      [key]: R.merge(value, {textColor: 'white'})
    }
  }
  return {
    [key]: value
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
