import React from "react";
import {
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addDays,
  getDaysInMonth,
} from "date-fns";
import "./Calendar.css";
import CalendarDay from "../../Components/CalendarDay/CalendarDay";

const TOTAL_DAYS_IN_CALENDAR = 35;
const getCalendarDaysInterval = startMonthDate => {
  const endMonthDate = endOfMonth(Date.now());
  const daysInInterval = eachDayOfInterval({
    start: addDays(startMonthDate, getDay(startMonthDate)),
    end: addDays(
      endMonthDate,
      TOTAL_DAYS_IN_CALENDAR - getDaysInMonth(startMonthDate)
    )
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
