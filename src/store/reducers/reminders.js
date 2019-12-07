import * as actionTypes from "../actions/actionTypes";

const initialState = {
  reminders: {}
};

const addReminder = (state, action) => {
  const newReminder = { ...action.reminder };
  const newState = addNewReminderToState(state, newReminder);

  return newState;
};

const removeReminder = (state, action) => {
  let newState = { ...state };
  delete newState.reminders[action.reminderDayId][action.id];

  return newState
};

const updateReminder = (state, action) => {
  const updatedReminder = { ...action.reminder };
  let newState = { ...state };
  delete newState.reminders[updatedReminder.reminderDayId][updatedReminder.id];
  const reminders = { ...(newState.reminders[action.newDayReminderDayId] || {}) };

  newState.reminders[action.newDayReminderDayId] = {
    ...reminders,
    [action.newReminderId]: {
      ...updatedReminder,
      id: action.newReminderId,
      reminderDayId: action.newDayReminderDayId
    }
  };
  
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_REMINDER:
      return addReminder(state, action);
    case actionTypes.REMOVE_REMINDER:
      return removeReminder(state, action);
    case actionTypes.UPDATE_REMINDER:
      return updateReminder(state, action);
    default:
      return state;
  }
};

export default reducer;
function addNewReminderToState(state, newReminder) {
  let reminders = { ...(state.reminders[newReminder.reminderDayId] || {}) };
  let newState = { ...state };
  newState.reminders[newReminder.reminderDayId] = {
    ...reminders,
    [newReminder.id]: { ...newReminder }
  };
  return newState;
}
