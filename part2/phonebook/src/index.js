import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import numberService from './services/numberService'

import './styles.css'


const App = () => {
  const [ persons, setPersons] = useState([])

  // State variables
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)

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
    const persName= newName

    if(personValid(newName)) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      numberService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setErrorMessage(`'${persName}' was successfully added!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        })
        .catch(error => {
          setErrorMessage(`'${persName}' could not be added`)
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      updatePeople(personObject)
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
    const idToBeDeleted = parseInt(event.target.id)
    const name = persons.find(person => person.id === idToBeDeleted).name
    if(window.confirm(`You sure you want to delete '${name}'?`)) {
      const personList = persons.filter(person => person.id !== idToBeDeleted)
      numberService
        .deletePerson(idToBeDeleted)
        .then(response => {
          setPersons(personList)
          setErrorMessage(`'${name}' was successfully deleted!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`'${name}' could not be deleted`)
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const updatePeople = personObject => {
    const persID = persons.find(person => person.name === personObject.name).id

    if(window.confirm(`${personObject.name} is already in phonebook, replace the old number with new one?`)) {
      numberService
        .update(persID, personObject)
        .then(response => {
          const personList = persons.filter(person => person.id !== persID)

          // Helper sort function for getting right order in list(by item id)
          const sortByID = (a, b) => {
            if(a.id > b.id) return 1
            if(a.id < b.id) return -1
            return 0
          }
          setPersons(personList.concat(response).sort(sortByID))
        })
        .catch(error => {
          setErrorMessage(`'${personObject.name}' could not be updated`)
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification message={errorMessage} />
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
