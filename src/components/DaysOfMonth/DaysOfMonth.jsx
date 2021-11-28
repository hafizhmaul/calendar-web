import moment from 'moment';
import React, { useState } from 'react';
import { Modal, ReadOnlyModal } from '..';
import { getDatesInMonthDisplay } from '../../utils/date-utils';
import { getDayOfMonth, getMonth, getMonthDayYear, getYear } from '../../utils/moment-utils';

const DaysOfMonth = ({ selectDate, setSelectDate }) => {
  const dateWithEvents = JSON.parse(localStorage.getItem('dateWithEvents')) || [];
  const [readOnlyData, setIsReadOnlyData] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenReadOnlyModal, setIsOpenReadOnlyModal] = useState(false);

  // handle when user click a date
  const handleChangeDate = (event) => {
    setSelectDate(event.target.getAttribute('data-date'));
  };

  // show modal add event 
  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  // close modal add event 
  const handleCloseModal = () => {
    setIsOpenModal(false);
  }

  // show readonly modal event
  const handleOpenReadOnlyModal = () => {
    setIsOpenReadOnlyModal(true);
  }

  // close readonly modal event
  const handleCloseReadOnlyModal = () => {
    setIsOpenReadOnlyModal(false);
  }

  // handle when user click date
  const handleClickEvent = (event, item) => {
    event.stopPropagation();

    handleOpenReadOnlyModal();
    setIsReadOnlyData(item)
  }

  // filter if date is same as selected date
  const selectDateWithEvent = dateWithEvents.filter(item => item.date === moment(selectDate).format("Do MMMM YYYY"));

  // get the amount of days from the current month and year
  const datesInMonth = getDatesInMonthDisplay(getMonth(selectDate) + 1, getYear(selectDate));

  return (
    <div className="date-indicator">
      <Modal isOpenModal={isOpenModal} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} selectedDate={moment(selectDate).format("Do MMMM YYYY")} selectDateWithEvent={selectDateWithEvent} />
      <ReadOnlyModal isOpenReadOnlyModal={isOpenReadOnlyModal} handleCloseReadOnlyModal={handleCloseReadOnlyModal} dateWithEvents={dateWithEvents} readOnlyData={readOnlyData} selectedDate={moment(selectDate).format("Do MMMM YYYY")}/>
      {datesInMonth.map((item, idx) => {
        
        // filtering the event at specific date 
        const filterSpecificDateEvent = dateWithEvents.filter(d => d.date === moment(item.date).format("Do MMMM YYYY"));
        
        // condition when user select a date
        const selectedDate = getMonthDayYear(selectDate) === getMonthDayYear(item.date) ? 'bg-purple-500 text-white font-semibold' : '';
        
        return (
          <div key={idx} className="date-day" onClick={handleOpenModal} data-active-month={item.currentMonth}>
            <div
              onClick={handleChangeDate}
              className={`date-icon ${selectedDate} block z-0`}
              data-active-month={item.currentMonth}
              data-date={item.date.toString()}
            >
              {getDayOfMonth(item.date)}

              {filterSpecificDateEvent.map((day, idx) => (
                <div key={idx} onClick={(e) => handleClickEvent(e, day)} className={`block text-left text-xs bg-${day.color} z-50 text-white font-semibold py-2 px-1 my-1 rounded-md hover:opacity-80`}>{day.name} : {day.startTime} - {day.endTime}</div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DaysOfMonth;
