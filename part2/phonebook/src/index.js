import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ])
  const [ newName, setNewName ] = useState('')

  const handleTextChange = (event) => {
    setNewName(event.target.value)
  }

  const savePerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={savePerson}>
        <div>
          name: <input value={newName} onChange={handleTextChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People people={persons} />
    </div>
  )
}

const People = ({people}) => {
  const listPeople = () => {
    return (
      people.map(person => <li key={person.id}>{person.name}</li>)
    )
  }

  return (
    <ul>
      {listPeople()}
    </ul>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
