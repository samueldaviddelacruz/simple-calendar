import React from "react";
import "./Home.css";
import Days from "../Components/Days/Days";
import Header from "../Components/Header/Header";
import {format} from "date-fns";
const Home = props => {

  return (
    <div className="container">
      <div className="calendar">
    
        <Header monthStr={format(Date.now(),"MMMM")}></Header>

        {<Days></Days>}
      </div>
    </div>
  );
};

export default Home;
