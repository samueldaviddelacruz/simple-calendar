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
  isSameMonth,
  isBefore
} from "date-fns";
import "./Calendar.css";



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
const Calendar = ({ startMonthDate, reminders }) => {
  console.log(reminders);
  const daysInInterval = getCalendarDaysInterval(startMonthDate);
  return daysInInterval.map((dayDate, indx) => {
    const currentDayReminders = (
      reminders[lightFormat(dayDate, "yyyy-MM-dd")] || [] ).sort( (reminderA,reminderB)  => {
        if(isBefore(reminderA,reminderB)) {
          return 1
        } 
        return -1;
      } ) ;
    const isWeekendDay = isWeekend(dayDate);
    const isOnSameMonth = isSameMonth(startMonthDate, dayDate);
    let dayContainerClasses = ["calendarDay"];
    let dayNumberClass = isWeekendDay && isOnSameMonth ? "weekendDay" : "";

    if (isWeekendDay || !isOnSameMonth) {
      dayContainerClasses.push("light-gray");
    }

    return (
      <div key={formatISO(dayDate)} className={dayContainerClasses.join(" ")}>
        <b className={dayNumberClass}>{lightFormat(dayDate, "d")}</b>

        {currentDayReminders.map(r => {
          const time = lightFormat(r.date, "H:MM aaaa")
          return (
            <div key={r.id} className={"reminder"}>
              <p
                style={{
                  color: r.color,
                }}
              >
                {`[${time}]${r.text}`}
              </p>
           
            </div>
          );
        })}
      </div>
    );
  });
};

export default Calendar;
