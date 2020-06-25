import React, {useState} from 'react'

const Country = ({ country, isSingle }) => {

  const [show, setShow] = useState(false)

  const handleAddInfo = () => {
    setShow(!show)
  }

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
        <img src={country.flag} height="150"></img>
      </div>
    )
  }

  else if (show) {
    return (
      <div key={country.numericCode}>
        <li key={country.numericCode}>{country.name} <button onClick={() => handleAddInfo()}>hide</button></li>
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
