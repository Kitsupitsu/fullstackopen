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

export default Course;