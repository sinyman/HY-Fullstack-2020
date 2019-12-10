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
  for (var i = 0; i < course.parts.length+1; i++) {
    console.log('HEJHEJ')
    return <Part name={course.parts[i].name} exercises={course.parts[i].exercises} />
  }
}

const Part = ({name, exercises}) => {
  return(
    <p>{name}<br/> Exercises: {exercises}</p>
  )
}
/*
const Total = (props) => {
  return (
    <p>Total number of exercises: {props.content[0].exercises
       + props.content[1].exercises
       + props.content[2].exercises}</p>
  )
}

EXTRA
    <p>  
      {props.content[0].name}<br/> Exercises: {props.content[0].exercises}<br/>
      {props.content[1].name}<br/> Exercises: {props.content[1].exercises}<br/>
      {props.content[2].name}<br/> Exercises: {props.content[2].exercises}
    </p>
*/
ReactDOM.render(<App />, document.getElementById('root'))
