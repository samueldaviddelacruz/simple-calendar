import * as actionTypes from "./actionTypes";
import { formatISO,lightFormat } from "date-fns";
export const addReminder = ({ text, city, date, color,weatherInfo }) => {
    
  const id = formatISO(date);
  const reminderDayId = lightFormat(date, 'yyyy-MM-dd')
  return {
    type: actionTypes.ADD_REMINDER,
    
    reminder: {
      reminderDayId:reminderDayId,
      id,
      text,
      city,
      date,
      color,
      weatherInfo
    }
  };
};

export const removeReminder = (id,reminderDayId) => {
  return {
    type: actionTypes.REMOVE_REMINDER,
    id,
    reminderDayId
  };
};

export const updateReminder = (newReminder) => {
  const newDayReminderDayId = lightFormat(newReminder.date, 'yyyy-MM-dd')
  const id = formatISO(newReminder.date);
  return {
    type: actionTypes.UPDATE_REMINDER,
    newDayReminderDayId,
    newReminderId:id,
    reminder: {
      ...newReminder,
    }
  };
};
