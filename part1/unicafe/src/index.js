import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (target, setter) => {
    return () => {
      setter(target + 1)
    }
  }
  
  return (
    <div>
      <Heading text="give feedback" />
      <Button onClick={increment(good, setGood)} text="good" />
      <Button onClick={increment(neutral, setNeutral)} text="neutral" />
      <Button onClick={increment(bad, setBad)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  const all = () => good + neutral + bad
  const avg = () => all() === 0 ? 0 : (good - bad) / all()
  const positive = () => all() === 0 ? 0 : good/ all() * 100
  return [
  <Heading text="statistics" />,
  <table>
    <tbody>
      <Statistic label="good" value={good} />
      <Statistic label="neutral" value={neutral} />
      <Statistic label="bad" value={bad} />
      <Statistic label="all" value={all()} />
      <Statistic label="average" value={avg().toFixed(1)} />
      <Statistic label="positive" value={positive().toFixed(1) + " %"} />
    </tbody>
  </table>
]
  
}


const Heading = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({label, value}) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
)

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
