import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    var oldPerson = persons.find(e => e.name === newName);
    if (oldPerson != null) {
      if (window.confirm(newName + " is already added to phonebook, replace the old number with new one?")) {
        personService.update(oldPerson.id, personObject)
      }
    } else {
      personService.create(personObject)
    }
    personService.getAll().then(person => setPersons(person));
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  useEffect(() => {
    personService.getAll().then(person => setPersons(person));
  }, [])

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter name={filterName} changeName={handleFilterChange} />
        <h3>Add a new:</h3>
        <PersonForm 
        addNewPerson={addNewPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
        <h2>Numbers</h2>
        <Numbers persons={persons} filterName={filterName}/>
    </div>
  )
}

const Filter = (props) => {
    return (<div>filter shown with <input value={props.name} onChange={props.changeName} /></div>)
}

const PersonForm = (props) => {
    return (<form onSubmit={props.addNewPerson}>
        <div>
          <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
          <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
          <div><button type="submit">add</button></div>
        </div>
      </form>)
}

const deleteNumber = (person) => {
  if (window.confirm("Do you really want to delete " + person.name + "?")) {
    personService.remove(person.id);
  }
}

const Numbers = (props) => {
    const personsToShow = props.filterName === ''
    ? props.persons
    : props.persons.filter(person => person.name.includes(props.filterName))

    return <div>{personsToShow.map(person => <p key={person.name}>{person.name}: {person.number} <button onClick={() => deleteNumber(person)}>Delete</button></p>)}</div>
}

export default App