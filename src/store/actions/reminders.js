import * as actionTypes from "./actionTypes";
import { formatISO,lightFormat } from "date-fns";
export const addReminder = ({ text, city, date, color }) => {
    
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
      color
    }
  };
};

export const removeReminder = reminderId => {
  return {
    type: actionTypes.REMOVE_REMINDER,
    reminderId
  };
};

export const updateReminder = (reminderId, newReminder) => {
  return {
    type: actionTypes.UPDATE_REMINDER,
    reminderId,
    reminder: {
      ...newReminder
    }
  };
};
