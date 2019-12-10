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

  return (
    <div>
      {courses}.map(course => <Course props={course} />)
    </div>
  )
}

const Course = (props) => {
  console.log("HEJSSAN: ", {props.course.name})
  return (
    <div>
      <Header course={props.course} />
      
    </div>
  )
}

/*
<Content course={props.course} />
<Total course={props.course} />
*/

const Header = ({course}) => {
  return (
    <h1> {course.name} </h1>
  )
}

const Content = ({course}) => {
  console.log("HEJ:", {course})

  //return course.parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)
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

  return <div>
      <b>Total of {totalEx} exercises!</b>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
