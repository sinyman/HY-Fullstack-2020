import React, {useState} from 'react'
import DataService from '../services/DataService'
import Weather from './Weather'

const Country = ({ country, isSingle }) => {

  const [show, setShow] = useState(false)

  const handleAddInfo = () => {
    setShow(!show)
  }

  /* I know that all lists should have key values for each unique list item
   * but here I really dont feel it is necessary to have any specific keys and
   * will let react generate its own from indices.
   * This results in a warning on line 39.
   */
  var langs = country.languages.map(lang => <li>{lang.name}</li>)

  if (isSingle) {
    return (
      <div key={country.numericCode}>
        <h2>{country.name}</h2>
        <p><b>Capital: </b>{country.capital}</p>
        <p><b>Population: </b>{country.population}</p>
        <h3>Languages</h3>
        <ul>
        {langs}
        </ul>
        <br/>
        <img src={country.flag} alt="flag of {country.name}" height="150"></img>
        <Weather location={country.capital} />
      </div>
    )
  }

  else if (show) {
    return (
      <div>
        <li key={country.numericCode}>{country.name} <button onClick={() => handleAddInfo()}>hide</button></li>
        <div>
          <h2>{country.name}</h2>
          <p><b>Capital: </b>{country.capital}</p>
          <p><b>Population: </b>{country.population}</p>
          <h3>Languages</h3>
          <ul>
          {langs}
          </ul>
          <br/>
          <img src={country.flag} alt="flag of {country.name}" height="150"></img>
        </div>
      </div>
    )
  }

  return (
    <div key={country.numericCode}>
      <li key={country.numericCode}>{country.name} <button onClick={() => handleAddInfo()}>show</button></li>
      <div></div>
    </div>
  )
}

export default Country
