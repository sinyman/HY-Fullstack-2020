import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, phone: '040-1234567' },
    { name: 'Ada Lovelace', id: 2, phone: '39-44-5323523' },
    { name: 'Dan Abramov', id: 3, phone: '12-43-234345' },
    { name: 'Mary Poppendieck', id: 4, phone: '39-23-6423122' }
  ])

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
        phone: newNumber,
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
