import React from "react";
import {
  endOfMonth,
  eachDayOfInterval,
  formatISO,
  getDay,
  addDays,
  getDaysInMonth,
  lightFormat,
  isWeekend,
  isSameMonth
} from "date-fns";
import "./Calendar.css";
const TOTAL_DAYS_IN_CALENDAR = 35
const getCalendarDaysInterval = (startMonthDate) => {
  const endMonthDate = endOfMonth(Date.now());
  const daysInInterval = eachDayOfInterval({
    start: addDays(startMonthDate,getDay(startMonthDate)),
    end: addDays(endMonthDate, TOTAL_DAYS_IN_CALENDAR - getDaysInMonth(startMonthDate))
  });

  return daysInInterval
}
const Calendar = ({
  startMonthDate,
  reminders,

}) => {
 
  const daysInInterval = getCalendarDaysInterval(startMonthDate)
  return daysInInterval.map((dayDate, indx) => {
    const isWeekendDay = isWeekend(dayDate)
    const isOnSameMonth = isSameMonth(startMonthDate,dayDate)
    let dayContainerClasses = ["calendarDay"]
    let dayNumberClass = isWeekendDay && isOnSameMonth? "weekendDay" :"" 
    
    if(isWeekendDay || !isOnSameMonth) {
        dayContainerClasses.push("light-gray")
    }

    return (
      <div key={formatISO(dayDate)} className={dayContainerClasses.join(" ")}>
        <b className={dayNumberClass}>{lightFormat(dayDate,"d")}</b>
      </div>
    );
  });
};

export default Calendar