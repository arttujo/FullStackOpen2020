import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>votes: {props.votes}</p>
    </div>
  );
};

const MostVoted = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
      <Anecdote anecdote={props.anecdote} votes={props.votes}></Anecdote>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(props.votes);
  const copy = [...votes];

  const randomizeAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const voteAnecdote = () => {
    ++copy[selected];
    setVotes(copy);
    console.log(votes);
  };

  const showHighestVotes = () => {
    const highest = Math.max(...votes);
    console.log("Highest=" + highest);
    return highest;
  };

  const showHighestAnecdote = () => {
    const highest = votes.indexOf(Math.max(...votes));
    return highest;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        anecdote={props.anecdotes[selected]}
        votes={votes[selected]}
      ></Anecdote>
      <Button text="next anecdote" onClick={randomizeAnecdote}></Button>
      <Button text="vote" onClick={voteAnecdote}></Button>
      <MostVoted
        text="Most voted anecdote"
        anecdote={props.anecdotes[showHighestAnecdote()]}
        votes={showHighestVotes()}
      ></MostVoted>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const anecdoteVotes = new Uint8Array(anecdotes.length);

ReactDOM.render(
  <App anecdotes={anecdotes} votes={anecdoteVotes} />,
  document.getElementById("root")
);
