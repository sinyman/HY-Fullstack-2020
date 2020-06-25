import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SearchField from './components/SearchField'
import Country from './components/Country'
import DataService from './services/DataService'

const App = () => {
  // State variables
  const [ countries, setCountries ] = useState([])
  const [ countrySearch, setCountrySearch ] = useState('')

  const handleSearchChange = (event) => setCountrySearch(event.target.value)

  const updateCountries = (event) => {
    event.preventDefault();
    DataService
    .getBySearch(countrySearch)
    .then(response => {
      setCountries(response)
    })
  }

  useEffect(() => {
    DataService
    .getAll()
    .then(response => setCountries(response))
  }, [])

  // Helper function for listing countries
  const rows = () => {
    if(countries.length === 1) {
      return countries.map(country =>
        <Country country={country}
          isSingle={true} />)
    } else if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    var counts = countries.map(country =>
      <Country country={country}
        isSingle={false} />)
    return <ul>{counts}</ul>
  }

  return (
    <div>
      <h1>Country information</h1>
      <SearchField countryName={countrySearch}
        handleSearchChange={handleSearchChange}
        updateList={updateCountries}
      />
      {rows()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
