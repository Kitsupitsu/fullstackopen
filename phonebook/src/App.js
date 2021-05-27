import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

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