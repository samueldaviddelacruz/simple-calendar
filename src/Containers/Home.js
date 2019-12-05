import React, { useState } from "react";
import "./Home.css";
import Calendar from "../Components/Calendar/Calendar";
import Header from "../Components/Header/Header";
import AddReminderForm from "./Forms/AddReminder/AddReminder";
import { format } from "date-fns";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { startOfMonth } from "date-fns";

const Home = props => {
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const startMonthDate = startOfMonth(Date.now());
  console.log(props)
  return (
    <div className="container">
      <div className="calendar">
        <AddReminderForm
          showForm={showAddReminderModal}
          hideForm={() => {
            setShowAddReminderModal(false);
          }}
          onFormSubmit={props.onReminderAdded}
        ></AddReminderForm>
        <Header
          monthStr={format(Date.now(), "MMMM")}
          showAddReminderModal={() => {
            setShowAddReminderModal(true);
          }}
        ></Header>

        {
          <Calendar
            startMonthDate={startMonthDate}
            reminders={props.reminders}
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
    onReminderAdded: reminder => {
      console.log("ok?",reminder)
      dispatch(actions.addReminder(reminder)    )
    },
    onReminderRemoved: reminderId =>
      dispatch(actions.removeReminder(reminderId)),
    onReminderUpdated: (reminderId, newReminder) =>
      dispatch(actions.updateReminder(reminderId, newReminder))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
