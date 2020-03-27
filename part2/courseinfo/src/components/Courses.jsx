import React from "react"

const Header = (props) =>
    <h1>{props.name}</h1>

const Part = (props) =>
    <p>
      {props.part.name} {props.part.exercises}
    </p>

// correctly renders null if parts is undefined.
const Content = ({parts = []}) =>
  parts.map( part =>
      <Part key={part.name} part={part} />
    )

// correctly renders zero if parts is undefined.
const Total = ({parts = []}) =>
    <p>
      Total Number of exercises: {
        parts.reduce( (acc, part) => {
          return acc+part.exercises
        }, 0)
      }
    </p>


const Courses = ({courses}) => 
    courses.map ( course => 
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )

export default Courses

