import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => 
    <button onClick={handleClick}>
      {text}
    </button>

const App = (props) => {
  const N = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(N).fill(0))

  const nextanecdote = () => () =>
    setSelected(Math.floor(Math.random() *N))

  const upvote = () => () => {
    const newVotes = [...votes]
    newVotes[selected] +=1
    setVotes(newVotes)
  }

  // good 'ole reduce.
  const favorite = () =>
    votes.reduce( (iMax, x, i, arr) => 
      x > arr[iMax] ? i : iMax, 
      0)

  return (
    <div>
      <h3> Current Anecdote </h3>
      {props.anecdotes[selected]}
      <br />
      {votes[selected]} votes
      <br />
      <Button text='I like it!' handleClick={upvote()} />
      <Button text='next anecdote' handleClick={nextanecdote()} />
      <h3>Most Popular</h3>
      {props.anecdotes[favorite()]}

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
