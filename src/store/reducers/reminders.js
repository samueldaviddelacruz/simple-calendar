import * as actionTypes from "../actions/actionTypes";

const initialState = {
  reminders: []
};

const addReminder = (state, action) => {
  const newReminder = { ...action.reminder };
  const foundReminder = state.reminders.find(r => r.id === newReminder.id);
  if (!foundReminder) {
    const newState = JSON.parse(
      JSON.stringify({ ...state, reminders: [...state.reminders, newReminder] })
    );
    return newState;
  }
  return state;
};

const removeReminder = (state, action) => {
  const newReminders = state.reminders.filter(r => r.id !== action.reminderId);
  return { ...state, reminders: newReminders };
};

const updateReminder = (state, action) => {
  const foundReminder = state.reminders.find(r => r.id === action.reminderId);
  if (foundReminder) {
    const updatedReminder = { ...foundReminder, ...action.reminder };
    const newReminders = state.reminders.filter(
      r => r.id !== foundReminder.reminderId
    );
    const newState = JSON.parse(
      JSON.stringify({ ...state, reminders: [...newReminders, updatedReminder] })
    );
    return newState;
  }
  return state;
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
      case actionTypes.ADD_REMINDER: return addReminder( state, action );
      case actionTypes.REMOVE_REMINDER: return removeReminder(state, action);
      case actionTypes.UPDATE_REMINDER: return updateReminder(state, action);    
      default: return state;
  }
};

export default reducer;
