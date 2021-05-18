import React from 'react'
import ReactDOM, { render } from 'react-dom'

const App = () => {
  const course = {
    id: 1,
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

  return <Course course={course} />
}

const Course = ({course}) => {
    return (
    <div>
    <Header course={course}/>
    <Content course={course}/>
    <Total parts={course}/>
    </div>);
}

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (<div>
    { props.course.parts.map(onepart => <Part key={onepart.id} part={onepart.name} exercises={onepart.exercises}/>) }
  </div>)
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
  
  for (let part of props.parts.parts) {
    sum += parseInt(part.exercises);
  }
  return (
    <b>total of {sum} exercises</b>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))