import React from 'react';

const weekOfDays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DaysOfWeek = () => {
  return (
    <div className="weekday-indicator">
      {weekOfDays.map((item, idx) => {
        return (
          <div className="weekday-indicator-icon" key={idx}>{item}</div>
        )
      })}
    </div>
  )
}

export default DaysOfWeek;
