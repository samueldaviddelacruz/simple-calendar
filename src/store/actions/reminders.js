import * as actionTypes from "./actionTypes";
import { formatISO } from "date-fns";
export const addReminder = ({ text, city, date, color }) => {
    
  const id = formatISO(date);
  return {
    type: actionTypes.ADD_REMINDER,
    reminder: {
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
