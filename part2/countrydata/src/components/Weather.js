import React, { useState, useEffect } from 'react'
import DataService from '../services/DataService'

const Weather = ({ location }) => {

  // Placeholder solution for state object initial values
  const [weather, setWeather] = useState({current:
    { temperature:0,
      wind_speed:0,
      wind_dir:"",
      weather_icons:[""],
      weather_descriptions:[""]}
    })

  useEffect(() => {
    DataService
    .getWeather(location)
    .then(response => setWeather(response))
  }, [])

  return (
    <div>
      <h3>Weather in {location} is {weather.current.weather_descriptions[0].toLowerCase()}</h3>
      <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}/>
      <p><b>Temperature: </b>{weather.current.temperature} Celsius</p>
      <p><b>Wind: </b>{(weather.current.wind_speed / 3.6).toFixed(1)}m/s direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather
