import React from 'react'

const Notification = ({ message }) => {

  const msgStyles = {
    border: '2px solid green',
    color: 'green',
    padding: '1em',
    maxWidth: '50vw',
    margin: '1vh 0px 0px 0px'
  }
  const errorStyles = {
    border: '2px solid red',
    color: 'red',
    padding: '1em',
    maxWidth: '50vw',
    margin: '1vh 0px 0px 0px'
  }

  if(message) {
    return (
      message.split(':')[0] === 'Error'
      ? <h3 style={errorStyles} >{message}</h3>
      : <h3 style={msgStyles} >{message}</h3>
    )
  }
  return null
}

export default Notification
