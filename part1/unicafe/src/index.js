import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => (
  <div>
    <h2>Statistics</h2>
      <ul>
        <li><p>Good: {good}</p></li>
        <li><p>Neutral: {neutral}</p></li>
        <li><p>Bad: {bad}</p></li>
      </ul>
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodTo = newValue => {
    setGood(newValue)
  }

  const setNeutralTo = newValue => {
    setNeutral(newValue)
  }

  const setBadTo = newValue => {
    setBad(newValue)
  }


  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={() => setGoodTo(good + 1)} text="Good" />
      <Button handleClick={() => setNeutralTo(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBadTo(bad + 1)} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
