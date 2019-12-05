import React from "react";
import "./Home.css";
import Calendar from "../Components/Calendar/Calendar";
import Header from "../Components/Header/Header";
import { format } from "date-fns";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import {
  startOfMonth,

} from "date-fns";
const Home = props => {
  console.log(props);
  const startMonthDate = startOfMonth(Date.now());

  return (
    <div className="container">
      <div className="calendar">
        <Header monthStr={format(Date.now(), "MMMM")}></Header>

        {
          <Calendar
            startMonthDate={startMonthDate}
            reminders={props.reminders}
            onReminderAdded={props.onReminderAdded}
            onReminderRemoved={props.onReminderRemoved}
            onReminderUpdated={props.onReminderUpdated}
          ></Calendar>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    reminders: state.reminders
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onReminderAdded: reminder => dispatch( actions.addReminder(reminder)  ),
    onReminderRemoved: reminderId =>
      dispatch(actions.removeReminder(reminderId)),
    onReminderUpdated: (reminderId, newReminder) =>
      dispatch(actions.updateReminder(reminderId, newReminder))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
