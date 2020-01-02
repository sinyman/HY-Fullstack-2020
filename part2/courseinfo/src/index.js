import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const assembleCourses = () => {
    return (
        courses.map(course => <Course key={course.id} course={course} />)
    )
  }

  return (
    <div>
      <h1>Web development curriculum</h1>
      {assembleCourses()}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h3> {course.name} </h3>
  )
}

const Content = ({course}) => {
  var parts = course.parts.map(part =>
    <Part name={part.name} exercises={part.exercises} key={part.id} />)

  return parts
}

const Part = ({name, exercises}) => {
  return(
    <p>{name}<br/> Exercises: {exercises}</p>
  )
}

const Total = ({course}) => {
  const totalEx = course.parts.reduce(function(sum, order) {
    return sum + order.exercises
  }, 0)

  return (
    <div>
      <b>Total of {totalEx} exercises!</b>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
