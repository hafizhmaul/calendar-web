import React from 'react';
import { monthsFull } from '../../constants/dates';
import { getMonthSet } from '../../utils/date-utils';
import { getMonth, getYear } from '../../utils/moment-utils';

const CalendarHeader = ({ selectDate, setSelectDate }) => {

  const changeMonth = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
  };

  const monthSet = getMonthSet(selectDate);

  return (
    <div className="flex bg-purple-600 rounded-lg">
      <div className="month-indicator">
        <h4 data-date={monthSet.prev} onClick={changeMonth} className="bg-white text-purple-700 px-3 py-1 rounded">
          {monthsFull[getMonth(monthSet.prev)]}
        </h4>
        <div className="block text-center uppercase">
          <h3>{monthsFull[getMonth(monthSet.current)]}</h3>
          <span className="text-lg font-normal">{getYear(selectDate)}</span>
        </div>
        <h4 data-date={monthSet.next} onClick={changeMonth} className="bg-white text-purple-700 px-3 py-1 rounded">
          {monthsFull[getMonth(monthSet.next)]}
        </h4>
      </div>
    </div>
  );
};

export default CalendarHeader;