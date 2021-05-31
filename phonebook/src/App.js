import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(e => e.name === newName)) {
      alert(newName + " is already added to phonebook!");
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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

const Numbers = (props) => {
    const personsToShow = props.filterName === ''
    ? props.persons
    : props.persons.filter(person => person.name.includes(props.filterName))

    return <div>{personsToShow.map(person => <p key={person.name}>{person.name}: {person.number}</p>)}</div>
}

export default App