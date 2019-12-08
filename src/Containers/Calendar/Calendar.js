import React from "react";
import {
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addDays,
  getDaysInMonth,
  subMonths,
  subDays
} from "date-fns";
import "./Calendar.css";
import CalendarDay from "../../Components/CalendarDay/CalendarDay";

const TOTAL_DAYS_IN_CALENDAR = 35;
const getCalendarDaysInterval = startMonthDate => {
  const endMonthDate = endOfMonth(startMonthDate);
  //const previousMonth = endOfMonth(subMonths(startMonthDate, 1));
  //console.log(TOTAL_DAYS_IN_CALENDAR - getDaysInMonth(startMonthDate))
 
  const daysInInterval = eachDayOfInterval({
    start: subDays(startMonthDate, getDay(startMonthDate)),
    end: addDays(endMonthDate, (TOTAL_DAYS_IN_CALENDAR - getDaysInMonth(startMonthDate)) - getDay(startMonthDate) )
  });
  
  return daysInInterval;
};

const Calendar = ({ startMonthDate, reminders, onReminderSelected }) => {
  const daysInInterval = getCalendarDaysInterval(startMonthDate);
  return daysInInterval.map((dayDate, indx) => {
    return (
      <CalendarDay
        key={indx}
        reminders={reminders}
        startMonthDate={startMonthDate}
        dayDate={dayDate}
        onReminderSelected={onReminderSelected}
      ></CalendarDay>
    );
  });
};

export default Calendar;
