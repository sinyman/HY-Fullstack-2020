import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={parts} />
      <Total content={parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.content[0].name}<br/> Exercises: {props.content[0].exercises}<br/>
      {props.content[1].name}<br/> Exercises: {props.content[1].exercises}<br/>
      {props.content[2].name}<br/> Exercises: {props.content[2].exercises}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises: {props.content[0].exercises
       + props.content[1].exercises
       + props.content[2].exercises}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
