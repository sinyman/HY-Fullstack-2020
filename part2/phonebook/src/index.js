import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([])

  // State variables
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newSearch, setNewSearch ] = useState('')

  const [showAll, setShowAll] = useState(true)

// Form handling
  const handleTextChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const personValid = (name) => {
    const names = persons.map(person => person.name.toLowerCase());

    // Returns false if person is already in list
    // returns true otherwise
    return !names.includes(name.toLowerCase())
  }

  const savePerson = (event) => {
    event.preventDefault()

    if(personValid(newName)) {
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber,
        show: true
      }

      setPersons(persons.concat(personObject))

    } else {
      window.alert(`${newName} is already added to phonebook`);
    }

    setNewName('')
    setNewNumber('')
    setNewSearch('')
    setShowAll(true)
  }

  const searchPeople = (event) => {
    event.preventDefault()
    setShowAll(false)

  }

  const getPeopleToShow = () => {

    const peopleToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase()
      .includes(newSearch.toLowerCase()))

    // Extra method to stop infinite rendering loop
    const clearSearchField = () => setNewSearch('')

    return peopleToShow
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPeople={searchPeople}
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />

      <PersonForm savePerson={savePerson}
        newName={newName}
        newNumber={newNumber}
        handleTextChange={handleTextChange}
        handleNumberChange={handleNumberChange}
      />

      <People people={getPeopleToShow()} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
