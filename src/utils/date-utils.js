import moment from 'moment';
import { getMonth, getMonthDayYear, getSpecificDate, getYear } from './moment-utils';

// get number of the month that selected
const getDaysInMonth = (month, year) => {
  return moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
}

// get the first day of the week
const getFirstWeekdayOfMonth = (month, year) => {
  return moment(`${month}-${year}`, 'MM-YYYY').startOf('month').weekday()
}

// get the previous month
const getPrevMonthYear = (month, year) => {
  // if the month is january
  if (month === 1) {
    return {
      month: 12,
      year: year - 1,
    };
  } else {
    return {
      month: month - 1,
      year,
    };
  }
};

// get the next month
const getNextMonthYear = (month, year) => {
  if (month === 12) {
    return {
      month: 1,
      year: year + 1,
    };
  } else {
    return {
      month: month + 1,
      year,
    };
  }
};


export const getDatesInMonthDisplay = (month, year) => {
  const daysInMonth = getDaysInMonth(month, year);
  const firstWeekday = getFirstWeekdayOfMonth(month, year);
  const result = [];

  const prev = getPrevMonthYear(month, year);
  const prevDaysInMonth = getDaysInMonth(
    prev.month,
    prev.year
  );

  // Add prev overflow dates... 
  for (let j = firstWeekday - 1; j >= 0; j--) {
    result.push({
      date: moment(`${prev.month}-${prevDaysInMonth - j}-${prev.year}`,'MM-DD-YYYY').toDate(),
      currentMonth: false
    })
  }

  // Add current month's dates
  for (let i = 1; i <= daysInMonth; i++) {
    result.push({
      date: moment(`${month}-${i}-${year}`, 'MM-DD-YYYY').toDate(),
      currentMonth: true
    })
  }
  // Overflow dates for next month to meet 42 days per month display requirement
  if (result.length < 35) {
    const daysToAdd = 35 - result.length;
    const next = getNextMonthYear(month, year);
    for (let k = 1; k <= daysToAdd; k++) {
      result.push({
        date: moment(
          `${next.month}-${k}-${next.year}`,
          'MM-DD-YYYY'
        ).toDate(),
        currentMonth: false
      })
    }
  }
  return result;
}

export const getMonthSet = (selectDate) => {
  const month = getMonth(selectDate) + 1;
  const result = {
    current: selectDate,
    prev: getSpecificDate(month - 1, 1, getYear(selectDate)),
    next: getSpecificDate(month + 1, 1, getYear(selectDate)),
  };

  if (month === 1) {
    result.prev = getSpecificDate(12, 1, getYear(selectDate) - 1);
  }

  if (month === 12) {
    result.next = getSpecificDate(1, 1, getYear(selectDate) + 1);
  }

  return result;
};

export const presetDateTracker = (dates) => {
  const result = {};

  if (dates && Array.isArray(dates)) {
    dates.forEach((date) => {
      const dateStr = getMonthDayYear(date);

      if (!result[dateStr]) {
        result[dateStr] = 1;
      } else {
        result[dateStr] += 1;
      }
    });
  }

  return result;
};

