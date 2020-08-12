import React from 'react'
import './index.css';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
const Total = ({ course }) => {
const sum = course.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)
return(
    <p id='total'>total of {sum} exercises</p>
) 
}

const Part = (props) => {
return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>    
)
}

const Content = ({ course }) => {


return (
    <div key={course}>
    {course.parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
)
}
  
const Course = ({ course }) => {
    return [
      <Header key={course.id} course={course} />,
      <Content key={course.id} course={course} />,
      <Total key={course.id} course={course} />
    ]
  }

export default Course