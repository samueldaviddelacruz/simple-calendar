import React from "react";
import "./Header.css";
import { Button } from "antd";
import { isBefore, format, isSameMonth, isSameYear } from "date-fns";
const Header = ({
  date,
  showAddReminderModal,
  onMoveMonthForward,
  onMoveMonthBack
}) => {
  const monthStr = format(date, "MMMM");
  const shouldRenderBackButton =
    isSameMonth(date, Date.now()) && isSameYear(date, Date.now());
  return (
    <>
      <Button
        className="AddReminderButton"
        type="primary"
        shape="circle"
        icon="plus"
        onClick={showAddReminderModal}
      />

      <div className="HeaderMonth">
        {!shouldRenderBackButton && <Button
          type="primary"
          shape="circle"
          icon="left"
          onClick={onMoveMonthBack}
        />}
        <h1 style={{ margin: "10px" }}>{monthStr}</h1>
        <Button
          type="primary"
          shape="circle"
          icon="right"
          onClick={onMoveMonthForward}
        />
      </div>

      <div className="HeaderDay">
        <b> Sunday </b>
      </div>
      <div className="HeaderDay">
        <b> Monday </b>
      </div>
      <div className="HeaderDay">
        <b> Tuesday </b>
      </div>
      <div className="HeaderDay">
        <b> Wednesday </b>
      </div>
      <div className="HeaderDay">
        <b> Tuesday </b>
      </div>
      <div className="HeaderDay">
        <b> Friday </b>
      </div>
      <div className="HeaderDay">
        <b> Saturday </b>
      </div>
    </>
  );
};

export default Header;
