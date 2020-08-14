import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import Countries from './components/Countries'
import axios from 'axios'


const App = () => {

    const [ search, setSearch ] = useState('')
    const [ countries, setCountries ] = useState([])

    const hookCountry = () => {
        if (search) {
            console.log("Fetching data")
            axios
                .get(`https://restcountries.eu/rest/v2/name/${search}`)
                .then(response => {
                    setCountries(response.data)
                })
            console.log("Promise fulfilled")
        }
    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    useEffect(hookCountry)

    const len = countries.length
    console.log(`Found ${len} countries`)
    const toDisplay = len === 0 
        ? <p>Enter the country name</p>
        : len === 1
          ? <Country country={countries[0]} />
          : len <= 10
            ? <Countries countries={countries} setSearch={setSearch}/>
            : <p>Too many matches, specify another filter</p>

    return (
        <div>
            find countries: 
                <input 
                    value={search}
                    onChange={handleSearchChange}
                />
            {toDisplay}
        </div>
    )
}

export default App