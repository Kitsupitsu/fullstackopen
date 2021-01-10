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
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  let parts = [];
    props.parts.forEach(part => {
      parts.push(<Part part={part.name} exercises={part.exercises} />)
    })
  return parts;
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  let sum = 0;
  
  for (let part of props.parts) {
    sum += parseInt(part.exercises);
  }
  return (
    <p>Number of exercises {sum}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))