import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good+neutral+bad;

  return (
    <div>
      <h1>Give feedback</h1>
      <button id="good" onClick={() => setGood(good+1)}>good</button>
      <button id="neutral" onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button id="bad" onClick={() => setBad(bad+1)}>bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

const Statistics = (props) => {
  if (parseInt(props.all) > 0) {
    return (
      <>
      <p>Good {props.good}</p>
      <p>Neutral {props.neutral}</p>
      <p>Bad {props.bad}</p>
      <p>All {props.all}</p>
      <p>Average {CalcAvg(props.good, props.bad, props.all)} </p>
      <p>Positive {CalcPos(props.good, props.all)} % </p>
      </>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }  
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