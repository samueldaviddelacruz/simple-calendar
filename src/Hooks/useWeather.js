import { useState } from "react";
import {OPEN_WEATHER_API_KEY} from '../Config/Config'
import { closestIndexTo } from "date-fns";
export default () => {
  const [weatherResults, setWeatherResults] = useState([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [closestWeatherForecast, setClosestWeatherForecast] = useState();
  const searchWeather = async cityId => {
    setIsLoadingWeather(true);
    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${OPEN_WEATHER_API_KEY}`;
    const results = await fetch(url).then(r => r.json());
    const { list } = results;

    setWeatherResults(list);
    setIsLoadingWeather(false);
  };
  const findClosestWeather = (selectedDate) => {
    if (selectedDate && weatherResults.length) {
      const weatherDates = weatherResults.map(w => new Date(w.dt * 1000));
      const closestDateIndex = closestIndexTo(
        selectedDate,
        weatherDates
      );
      console.log(weatherResults[closestDateIndex].weather[0])
      setClosestWeatherForecast(weatherResults[closestDateIndex].weather[0] );
    }
  };
  const resetWeatherForecast  = () => {
    setWeatherResults([])
    setClosestWeatherForecast(null)
  }

  return { weatherResults, isLoadingWeather, searchWeather,closestWeatherForecast,findClosestWeather,resetWeatherForecast };
};