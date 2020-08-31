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
const Stat = (props)=>{
  return (
  <tr>
    <td>
    {props.text} {props.value}
    </td>
  </tr>
  )
}

const AllStats = (props) =>{
  if (props.total===0){
    return (
      <p>there are no statistics :(</p>
    )
  } else {
    return (  
      <table>
        <tbody>
          <Stat text='good' value={props.good}></Stat>
          <Stat text='neutral' value={props.neutral}></Stat>
          <Stat text='bad' value={props.bad}></Stat>
          <Stat text='all' value={props.good+props.bad+props.neutral}></Stat>
          <Stat text='average' value={props.average}></Stat>
          <Stat text='positive' value={props.positive}></Stat>
        </tbody>
      </table> 
    )
  }
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
    return ((good/total)*100).toFixed(1) + '%'
  }
  return (
    <div>
      <Header text='give feedback'></Header>
      <Button onClick={addGood} text= 'good'></Button>
      <Button onClick={addNeutral} text= 'neutral'></Button>
      <Button onClick={addBad} text= 'bad'></Button>
      <Header text='statistics'></Header>
      <AllStats total={bad+good+neutral} good={good} bad={bad} neutral={neutral} average={calcAverage()} positive={calcPositive()}></AllStats>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)