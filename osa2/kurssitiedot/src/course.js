import React from "react";

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

export default Course