import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => 
    <button onClick={handleClick}>
      {text}
    </button>

// table version
const Statistic = ({text, value}) =>
    <tr>
      <td>
        {text}:
      </td>
      <td>
        {value}
      </td> 
    </tr>


const Statistics = ({ good, bad, neutral }) => {
  //   calculate the statistic
  const all = good + neutral + bad
  const average = (( good - bad ) / all ).toFixed(3)
  const positive = ( 100 * good / all ).toFixed(2) + '%'

  if (all === 0) {
    return (
      <p>No statistic have been collected yet!</p>
    )    
  }

  return (
    <table>
      <caption>
        Statistics
      </caption>
      <tbody>

    <Statistic text='good' value={good} /> 
    <Statistic text='neutral' value={neutral} /> 
    <Statistic text='bad' value={bad} />
    <Statistic text='all' value={all} /> 
    <Statistic text='average' value={average} /> 
    <Statistic text='positive' value={positive} />

      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
//   seed hack no longer needed!
// //   seed with one good review
// // ( also to prevent divide0 )

  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const setGoodValue = (newValue) => () => {
    setGood(newValue)
  }
  const setNeuralValue = (newValue) => () => {
    setNeutral(newValue)
  }
  const setBadValue = (newValue) => () => {
    setBad(newValue)
  }

  return (
    <div>
        <h3> Give feedback </h3>
        <Button handleClick={setGoodValue(good +1)} text="good" />
        <Button handleClick={setNeuralValue(neutral +1)} text="neutral" />
        <Button handleClick={setBadValue(bad +1)} text="bad" />
        <Statistics 
            good={good} neutral={neutral} bad={bad}
        />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
