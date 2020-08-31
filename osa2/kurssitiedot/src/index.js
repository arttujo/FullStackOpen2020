import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};
const Content = (props) => {
  const { parts } = props;
  return (
    <ul>
      {parts.map((part) => (
        <li key={part.id}>
          <Part part={part.name} exercise={part.exercises}></Part>
        </li>
      ))}
    </ul>
  );
};

const Total = (props) => {
  const { parts } = props;
  let initialValue = 0;
  let total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, initialValue);

  return <h3>Number of exercises: {total}</h3>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Course = (props) => {
  const {courses} = props
  console.log(courses);
  return (
    <div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Header course={course}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  //1H
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
        {
          name: "Authentication",
          exercises: 5,
          id: 3
        }
      ],
    },
  ];

  return (
    <div>
      <Course courses={courses}></Course>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
