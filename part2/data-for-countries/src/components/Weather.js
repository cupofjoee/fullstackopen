import React from 'react'

const Weather = ({ weather }) => {
    if (weather.message == '') return null
    return (
        <div>
            <h2>Weather in {weather.location.name}</h2>
            <h3>temperature {weather.current.temperature} celcius</h3> 
            <img src={weather.current.weather_icons} alt="icon" width="300" />
            <h3>wind {weather.current.wind_speed} mph in the direction {weather.current.wind_dir}</h3> 
        </div> 
    )
}

export default Weather