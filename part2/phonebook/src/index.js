import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import numberService from './services/numberService'

const App = () => {
  const [ persons, setPersons] = useState([])

  // State variables
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

// Form handling
  const handleTextChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearchChange = (event) => { setNewSearch(event.target.value) }

  const personValid = (name) => {
    const names = persons.map(person => person.name.toLowerCase());
    return !names.includes(name.toLowerCase())
  }

  const savePerson = (event) => {
    event.preventDefault()

    if(personValid(newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      numberService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))

        })
        .catch(error => {
          alert('Person could not be added to server')
        })

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

  const deletePeople = event => {
    event.preventDefault()
    if(window.confirm('You sure you want to delete this person?')) {
      const idToBeDeleted = event.target.id
      const personList = persons.filter(person => person.id !== parseInt(idToBeDeleted))
      numberService
        .deletePerson(idToBeDeleted)
        .then(response => setPersons(personList) )
        .catch(error => {
          alert('Person could not be deleted')
        })
    }
  }

  useEffect(() => {
  numberService
    .getAll()
    .then(initialData => {
      setPersons(initialData)
    })
  }, [])

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

      <People people={getPeopleToShow()} deleteButtonClick={deletePeople} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
