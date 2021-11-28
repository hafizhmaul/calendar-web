import React, { useEffect, useRef, useState } from 'react'
import { CalendarHeader, DaysOfMonth, DaysOfWeek } from '../../components';
import { presetDateTracker } from '../../utils/date-utils';
import { getToday } from '../../utils/moment-utils';

const Calendar = ({ activeDates, onDateSelect}) => {
  const presetActiveDates = useRef(presetDateTracker(activeDates || []));
  const [selectDate, setSelectDate] = useState(getToday());

  useEffect(() => {
    if (onDateSelect) {
      onDateSelect(selectDate);
    }
  }, [selectDate]);

  return (
    <div className="calendar-month">
     <CalendarHeader selectDate={selectDate} setSelectDate={setSelectDate}/>     
     <DaysOfWeek/>
     <DaysOfMonth 
      selectDate={selectDate}
      activeDates={presetActiveDates.current}
      setSelectDate={setSelectDate}
     />
    </div>
  )
}

export default Calendar
