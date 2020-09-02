import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import "./app.css";

const ERROR = "error";
const SUCCESS = "success";

const FilteringForm = (props) => {
  const { handleSearchChange, search } = props;
  return (
    <div>
      Search
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
  const { persons, search, deletePerson } = props;

  const personsToShow = persons
    ? persons.filter((person) => person.name.includes(search))
    : persons;

  const deleteFromList = (person) => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    console.log("clicked on", person);
    if (confirm) {
      console.log("delete");
      deletePerson(person);
    } else {
      console.log("cancel");
    }
  };

  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
            <button
              onClick={() => {
                deleteFromList(person);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else if (message.type === ERROR) {
    return <div className="error">{message.text}</div>;
  } else {
    return <div className="success">{message.text}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const { getAll, create, deletePers, updatePers } = personService;

  useEffect(() => {
    getAll().then((data) => {
      console.log(data);
      setPersons(data);
    });
  }, [getAll]);

  const refreshData = () => {
    getAll().then((data) => {
      setPersons(data);
      console.log("fetched data after delete");
    });
  };

  const messageHandler = (text, type) => {
    setMessage({ text: text, type: type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const deletePerson = (person) => {
    deletePers(person)
      .then((response) => {
        if (response.status === 200) {
          messageHandler(`${person.name} was deleted`, SUCCESS);
          refreshData();
        }
      })
      .catch((e) => {
        console.log("error", e);
        messageHandler(
          `${person.name} has already been removed from the phonebook!`,
          ERROR
        );
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    const match = persons.filter((person) => {
      return person.name === newName;
    });
    console.log("match", match);
    if (match.length > 0) {
      const changeNumber = window.confirm(
        `${newName} is already on the list. Want to update their number?`
      );
      if (changeNumber) {
        console.log("change");
        updatePers(match[0].id, personObj)
          .then((response) => {
            console.log("update", response);
            messageHandler(
              `Succesfully updated ${response.data.name} number to ${response.data.number}`,
              SUCCESS
            );
            refreshData();
          })
          .catch((e) => {
            console.log(e);
            messageHandler(
              `Person you tried to edit does not exist anymore`,
              ERROR
            );
            refreshData();
          });
      } else {
        console.log("cancel");
      }
    } else {
      create(personObj).then((response) => {
        console.log("create:");
        console.log(response);
        messageHandler(`${response.name} was added!`, SUCCESS);
        setPersons(persons.concat(response));
      });
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
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <FilteringForm
        handleSearchChange={handleSearchChange}
        search={search}
      ></FilteringForm>
      <h2>Add new contact</h2>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></AddPersonForm>
      <h2>Numbers</h2>
      <PersonList
        persons={persons}
        search={search}
        deletePerson={deletePerson}
      ></PersonList>
    </div>
  );
};

export default App;
