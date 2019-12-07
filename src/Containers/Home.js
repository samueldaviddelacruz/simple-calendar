import React, { useState } from "react";
import "./Home.css";
import Calendar from "./Calendar/Calendar";
import Header from "../Components/Header/Header";
import AddReminderForm from "./Forms/AddReminder/AddReminder";
import UpdateReminderForm from "./Forms/UpdateReminder/UpdateReminder";
import { format } from "date-fns";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { startOfMonth } from "date-fns";

const Home = props => {
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [showEditReminderModal, setShowEditReminderModal] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const startMonthDate = startOfMonth(Date.now());

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

        {selectedReminder && (
          <UpdateReminderForm
            showForm={showEditReminderModal}
            hideForm={() => {
              setShowEditReminderModal(false);
            }}
            onFormSubmit={reminder => {
              console.log("updated reminder", reminder);
              props.onReminderUpdated(reminder);
              setSelectedReminder(null);
            }}
            reminder={selectedReminder}
            onReminderRemoved={props.onReminderRemoved}
          ></UpdateReminderForm>
        )}
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
            onReminderSelected={reminder => {
              setSelectedReminder({ ...reminder });
              setShowEditReminderModal(true);
            }}
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
     
      dispatch(actions.addReminder(reminder));
    },
    onReminderRemoved: (id, reminderDayId) =>
      dispatch(actions.removeReminder(id, reminderDayId)),
    onReminderUpdated: newReminder =>
      dispatch(actions.updateReminder(newReminder))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
