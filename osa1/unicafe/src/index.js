import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => {
  return (
  <button onClick={onClick}>{text}</button>
  )
}

const Header = ({text})=>{
  return (
  <h1>{text}</h1>
  )
}
const Stat = ({text, value})=>{
  return (
  <p>{text} {value}</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const addGood =()=> setGood(good+1)
  const addNeutral =()=> setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)

  const calcAverage = () => {
    const total = good+bad+neutral
    return (good-bad)/total
  }

  const calcPositive = () =>{
    const total = good+bad+neutral
    return (good/total)*100 + '%'
  }



  return (
    <div>
      <Header text='give feedback'></Header>
      <Button onClick={addGood} text= 'good'></Button>
      <Button onClick={addNeutral} text= 'neutral'></Button>
      <Button onClick={addBad} text= 'bad'></Button>
      <Header text='statistics'></Header>
      <Stat text='good' value={good}></Stat>
      <Stat text='neutral' value={neutral}></Stat>
      <Stat text='bad' value={bad}></Stat>
      <Stat text='all' value={good+bad+neutral}></Stat>
      <Stat text='average' value={calcAverage()}></Stat>
      <Stat text='positive' value={calcPositive()}></Stat>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)