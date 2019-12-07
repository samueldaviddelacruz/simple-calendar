import React from "react";
import WeatherIcon from '../UI/WeatherIcon/WeatherIcon'
import {
  formatISO,
  lightFormat,
  isWeekend,
  isSameMonth,
  isBefore
} from "date-fns";
import "./CalendarDay.css";
const getSortedCurrentDayReminders = (reminders, dayDate) => {
  const reminderDayId = lightFormat(dayDate, "yyyy-MM-dd")
  const remindersArr = Object.keys(
    (reminders[reminderDayId] || {})
  ).map(key => reminders[reminderDayId][key]);
    
  const currentDayReminders = (
    remindersArr
  ).sort((reminderA, reminderB) => {
    if (isBefore(reminderA.date, reminderB.date)) {
      return -1;
    }
    return 1;
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
const CalendarDay = ({
  reminders,
  startMonthDate,
  dayDate,
  onReminderSelected
}) => {
  const currentDayReminders = getSortedCurrentDayReminders(reminders, dayDate);
  const { dayContainerClasses, dayNumberClass } = getContainersClasses(
    startMonthDate,
    dayDate
  );
  return (
    <div key={formatISO(dayDate)} className={dayContainerClasses.join(" ")}>
      <b className={dayNumberClass}>{lightFormat(dayDate, "d")}</b>

      {currentDayReminders.map(r => {
        const time = lightFormat(r.date, "H:mm aaaa");
        const reminderText = `${r.text}`;
        return (
          <div key={r.id} className={"reminder"} style={{borderColor:r.color}}>
            <div style={{textAlign:"initial"}}> {time} <WeatherIcon {...r.weatherInfo} size={"small"}></WeatherIcon> </div>
            <p
              style={{
                color: r.color
              }}
              onClick={() => {
                onReminderSelected(r);
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
