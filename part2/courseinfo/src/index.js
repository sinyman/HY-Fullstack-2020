import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1> {props.course.name} </h1>
  )
}

const Content = ({course}) => {

  return course.parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)
}


const Part = ({name, exercises}) => {
  return(
    <p>{name}<br/> Exercises: {exercises}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
