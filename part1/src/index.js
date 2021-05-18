import React from 'react'
import ReactDOM, { render } from 'react-dom'

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

  return (<div>{ courses.map(course => <Course course={course} />)}</div>)
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
  const sum = props.parts.parts.reduce((s,p) => s+p.exercises, 0);
  return (
    <b>total of {sum} exercises</b>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))