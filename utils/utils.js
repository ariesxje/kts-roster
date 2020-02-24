import {format} from 'date-fns';
import * as R from 'ramda';

const short = {
  marked: true,
  color: '#FFC752',
  textColor: 'white',
};

const long = {
  marked: true,
  color: '#eb8f34',
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
  R.merge(short, endingDay), off, off, R.merge(short, startingDay), short, short, R.merge(short, endingDay),
  off, R.merge(long, startingDay), long, long, R.merge(long, endingDay), off, off,
  R.merge(short, startingDay), short, R.merge(short, endingDay), off, off, R.merge(short, startingDay), short,
];

const START_DATE = 1576418400000;
const DAY = 24 * 3600 * 1000;
const FORMAT = 'YYYY-MM-DD';

const getDuty = (dateTime) => {
  const dayInRoster = Math.floor((dateTime - START_DATE) / DAY) % roster.length;
  const today = new Date().getTime();
  const key = format(dateTime, FORMAT);
  const value = roster[dayInRoster];
  if (format(today, FORMAT) === key) {
    return {
      [key]: R.merge(value, {textColor: 'red'})
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
