import React from 'react'

const SearchField = ({ countryName, handleSearchChange, updateList }) => {

  return (
    <div>
      <h3>Search for a country</h3>
      <form onSubmit={updateList}>
        <input value={countryName} onChange={handleSearchChange} />
      </form>
    </div>
  )
}

export default SearchField
