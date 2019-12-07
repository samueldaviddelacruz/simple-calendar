import React from "react";
import { Tooltip } from "antd";
import "./WeatherIcon.css";

const WeatherIcon = props => {
  const { icon, description, main ,size } = props;
  const url = `http://openweathermap.org/img/wn/${icon}.png`;
  let imgClasses = []
  if (size) {
    imgClasses.push(size)
  }
  return (
    <div className={"weather-icon"}>
      <Tooltip placement="top" title={description}>
        <img src={url} alt={description} className={imgClasses.join(' ')}/>
        <label>{main}</label>
      </Tooltip>
    </div>
  );
};

export default WeatherIcon;
