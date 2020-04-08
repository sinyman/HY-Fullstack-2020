import React from 'react'

const Country = ({ country, isSingle }) => {

  if (isSingle) {
    var langs = country.languages.map(lang => <li>{lang.name}</li>)
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
        <img src={country.flag} height="150"></img>
      </div>
    )
  }

  return (
    <div key={country.numericCode}>
      <li key={country.numericCode}>{country.name}</li>
    </div>
  )
}

/*
const Country = ({ name, id }) => {

  return (
    <div key={id}>
      <li>{name}</li>
    </div>
  )
}
*/

export default Country
