import React from 'react'
import ReactDOM from 'react-dom'

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


// ============================================================================

const Courses = ({courses}) => 
    courses.map ( course => 
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )

          
const App = () => {
  
  const courses = [
    {
      name: 'Course without parts',
      id: 0
    },

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
      <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
