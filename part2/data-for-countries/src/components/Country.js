import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Weather from './Weather'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {

    const [ weather, setWeather ] = useState({ message: '' })

    const languages = country.languages.map(lang => <li>{lang.name}</li>)

    const hookWeather = () => {
        console.log("Fetching weather")
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response =>
                setWeather(response.data))
        console.log("Promise fulfilled")
    }

    useEffect(hookWeather, [])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2> 
            <ul>
                {languages}
            </ul>
            <img src={country.flag} alt="flag" width="300"/>
            <Weather weather={weather} />
        </div>
    )
}

export default Country