import React, { useState,useEffect } from "react";
import axios from 'axios'

const FilteringForm = (props) => {
  const { handleSearchChange, search } = props;
  return (
    <div>
      <h2>Phonebook</h2>
      <input onChange={handleSearchChange} value={search}></input>
    </div>
  );
};

const AddPersonForm = (props) => {
  const {
    addPerson,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
  } = props;
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const PersonList = (props) => {
    const {persons, search} = props

  const personsToShow = persons
    ? persons.filter((person) => person.name.includes(search))
    : persons;

  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");


  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response =>{
        console.log(response)
        setPersons(response.data)
      })

  }, [])


  const addPerson = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    let names = [];
    persons.map((person) => names.push(person.name));
    if (names.includes(newName)) {
      alert(`${newName} is already on the list!`);
    } else {
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <FilteringForm
        handleSearchChange={handleSearchChange}
        search={search}
      ></FilteringForm>
      <h2>Add a new</h2>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></AddPersonForm>
      <h2>Numbers</h2>
      <PersonList persons={persons} search={search}></PersonList>
    </div>
  );
};

export default App;
