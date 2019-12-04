import React from "react";
import "./Header.css";
const Header = ({monthStr}) => {
  return (
    <>
     <div className="HeaderMonth"><h1>{monthStr}</h1></div>
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
