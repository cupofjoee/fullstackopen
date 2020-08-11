import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  
  const nextAnecdote = () => {
    let i = randomNumber(0,5)
    setSelected(i)
  }

  const getSelected = () => selected

  const vote = () => {
      const copy = [...points]
      copy[getSelected()] += 1
      setPoints(copy)
      if (copy[getSelected()] > copy[mostVoted]) {
        setMostVoted(getSelected())
      }
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[getSelected()]} votes</p>
      <Button onClick={vote} text="vote" />
      <Button onClick={nextAnecdote} text="next anecdote"/>
      <Heading text="Anecdote with most votes" />
      <p>{props.anecdotes[mostVoted]}</p>
      <p>has {points[mostVoted]} votes</p>
    </div>
  )
}

const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min)

const Heading = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);
