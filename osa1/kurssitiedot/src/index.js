import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

 
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

const Header =(props)=>{
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}></Part>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}></Part>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}></Part>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const Part = (props) =>{
  return (
    <p>{props.part} {props.exercise}</p>
  )
}
  return (
    <div>
      <Header course={course}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))