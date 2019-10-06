import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text, value}) => {
  if(text === 'Positive') {
    return(
      <tbody>
        <tr>
          <th>{text}:</th>
          <td>{value.toFixed(2)}%</td>
        </tr>
      </tbody>
    )
  }
  return(
    <tbody>
      <tr>
        <th>{text}:</th>
        <td>{value.toFixed(2)}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let statSum = good+bad+neutral;
  if(statSum === 0) {
    return(
      <div>
        <h2>Statistics</h2>
        There are no statistics to be shown
      </div>
    )
  }

  return(
    <div>
      <h2>Statistics</h2>
        <table>
          <Statistic text='Good' value={good} />
          <Statistic text='Neutral' value={neutral} />
          <Statistic text='Bad' value={bad} />
          <Statistic text='Total' value={good+neutral+bad} />
          <Statistic text='Average score' value={(good-bad)/(good+neutral+bad)} />
          <Statistic text='Positive' value={(good/(good+neutral+bad))*100} />
        </table>
    </div>
  )
}

/*
  return(
    <div>
      <h2>Statistics</h2>
        <ul>
          <Statistic text='Good' value={good} />
          <Statistic text='Neutral' value={neutral} />
          <Statistic text='Bad' value={bad} />
          <Statistic text='Total' value={good+neutral+bad} />
          <br/>
          <Statistic text='Average score' value={(good-bad)/(good+neutral+bad)} />
          <Statistic text='Positive' value={(good/(good+neutral+bad))*100} />
        </ul>
    </div>
  )
*/

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
