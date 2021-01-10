import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good+neutral+bad

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" emotion={good} action={setGood}/>
      <Button text="neutral" emotion={neutral} action={setNeutral}/>
      <Button text="bad" emotion={bad} action={setBad}/>

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

const Button = (props) => {
  return(
    <button onClick={() => props.action(props.emotion+1)}>{props.text}</button>
  )
}

const Statistics = (props) => {
  let avg = CalcAvg(props.good, props.bad, props.all)
  let pos = CalcPos(props.good, props.all) + " %"

  if (parseInt(props.all) > 0) {
    return (
      <table>
        <tbody>
        <StatisticsLine feedback="Good" amount={props.good}/>
        <StatisticsLine feedback="Neutral" amount={props.neutral}/>
        <StatisticsLine feedback="Bad" amount={props.bad}/>
        <StatisticsLine feedback="All" amount={props.all}/>
        <StatisticsLine feedback="Average" amount={avg}/>
        <StatisticsLine feedback="Positive" amount={pos}/>
      </tbody>
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }  
}

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.feedback}</td>
      <td>{props.amount}</td>
    </tr>
  )
  
}

const CalcAvg = (good, bad, all) => {
  return (all > 0) ? ((good * 1 + bad * -1) / all) : 0
}

const CalcPos = (good, all) => {
  return (all > 0) ? ((good / all) * 100) : 0
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)