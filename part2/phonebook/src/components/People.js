import React from 'react'

const People = ({people}) => {
  const listPeople = () => {
    return (
      people.map(person => <li key={person.id}>{person.name} {person.phone}</li>)
    )
  }

  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {listPeople()}
      </ul>
    </div>
  )
}

export default People
