import React from 'react'

const Countries = ({ countries, setSearch }) => {
    const handleOnClick = (search) => () => setSearch(search)

    const countryNames = countries.map(country => 
        <div>
            {country.name}
            <button onClick={handleOnClick(country.name)}>show</button>
        </div>
        )
    return (
        countryNames
    )
}

export default Countries