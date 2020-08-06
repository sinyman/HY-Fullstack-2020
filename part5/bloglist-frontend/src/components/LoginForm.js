import React from 'react'

const LoginForm = ({ formHandler, changeHandler }) => {

  const styles = {
      display: 'grid',
      width: '15vw',
      padding: '2em 2em',
      border: '2px solid black',
  }

  const h3Style = { marginTop: '0em' }

  return(
    <div style={{minWidth: '350px'}}>
      <form className='form' style={styles} onSubmit={formHandler}>
        <h3 style={h3Style}>Log in</h3>
        <label>Username</label>
        <input onChange={changeHandler} name='uname' ></input>
        <label>Password</label>
        <input type='password' onChange={changeHandler} name='pw' />
        <button style={{marginTop: '1vh'}} type='submit' >Submit</button>
      </form>
    </div>
  )
}

export default LoginForm
