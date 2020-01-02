import React from 'react'

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

export default Course
