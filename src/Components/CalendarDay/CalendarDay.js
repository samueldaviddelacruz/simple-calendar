import React from "react";
import {
  formatISO,
  lightFormat,
  isWeekend,
  isSameMonth,
  isBefore
} from "date-fns";
import './CalendarDay.css'
const getSortedCurrentDayReminders = (reminders, dayDate) => {
  const currentDayReminders = (
    reminders[lightFormat(dayDate, "yyyy-MM-dd")] || []
  ).sort((reminderA, reminderB) => {
    if (isBefore(reminderA, reminderB)) {
      return 1;
    }
    return -1;
  });

  return currentDayReminders;
};
const getContainersClasses = (startMonthDate, dayDate) => {
  const isWeekendDay = isWeekend(dayDate);
  const isOnSameMonth = isSameMonth(startMonthDate, dayDate);
  let dayContainerClasses = ["calendarDay"];
  let dayNumberClass = isWeekendDay && isOnSameMonth ? "weekendDay" : "";

  if (isWeekendDay || !isOnSameMonth) {
    dayContainerClasses.push("light-gray");
  }

  return {
    dayContainerClasses,
    dayNumberClass
  };
};
const CalendarDay = ({ reminders, startMonthDate, dayDate }) => {
  const currentDayReminders = getSortedCurrentDayReminders(reminders, dayDate);
  const { dayContainerClasses, dayNumberClass } = getContainersClasses(
    startMonthDate,
    dayDate
  );
  return (
    <div key={formatISO(dayDate)} className={dayContainerClasses.join(" ")}>
      <b className={dayNumberClass}>{lightFormat(dayDate, "d")}</b>

      {currentDayReminders.map(r => {
        const time = lightFormat(r.date, "H:MM aaaa");
        const reminderText = `[${time}]
        
                              ${r.text}`;
        return (
          <div key={r.id} className={"reminder"}>
            <p
              style={{
                color: r.color
              }}
            >
              {reminderText}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDay;
