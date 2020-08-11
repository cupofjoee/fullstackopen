import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { title: 'Fundamentals of React', ex: 10 },
    { title: 'Using props to pass data', ex: 7 },
    { title: 'State of a component', ex: 14 },
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  var items = props.parts.map((item) => <Part title={item.title} exercises={item.ex} />)

  return (
    <div>
      {items}
    </div>
  )
}

const Part = (props) => <p>{props.title} {props.exercises}</p>

const Total = (props) => {
  const total = props.parts.map(item => item.ex).reduce((a,b) => a + b, 0)
  return <p>Number of exercises {total}</p>
}

ReactDOM.render(<App />, document.getElementById('root'))
// const App = (props) => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])
//   const [clicks, setClicks] = useState(0)

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   const incrementHelper = (val) => {
//     return () => {
//       setClicks(clicks + val)
//     }
//   }

//   return (
//     <div>
//       <div>
//         {left}
//         <Button onClick={handleLeftClick} text={"left"} />
//         <Button onClick={handleRightClick} text={"right"} />
//         {right}
//         <History allClicks={allClicks} />
//         <br>
//         </br>
//         {clicks}
//         <Button onClick={incrementHelper(100)} text="hundred" />
//         <Button onClick={incrementHelper(500)} text="five hundred" />
//         <Button onClick={incrementHelper(1000)} text="thousand" />
//       </div>
//     </div>
//   )
// }

// const Button = (props) => {
//   return <button onClick={props.onClick}>{props.text}</button>
// }

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return <p>Click the button</p>
//   }
//   return <p>{props.allClicks.join(' ')}</p>
// }

// ReactDOM.render(<App />, document.getElementById('root'))

