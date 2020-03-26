import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import personService from './services/persons'

import Filter from      './components/Filter'
import PersonForm from  './components/PersonForm'
import Persons from     './components/Persons'
import Notification from './components/Notification'
import Footer from        './components/Footer'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState( true )
  const [ filterName, setFilterName ] = useState( '' )
  const [ notificationMessage, setNotificationMessage ] = useState(null)



  useEffect( () => {
    console.log( 'in effect')
    personService.getAll()
      .then(data => setPersons(data))

  }, [])
  console.log( 'render', `${persons.length} persons`)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter 
          showAll={showAll} setShowAll={setShowAll}
          filterName={filterName} setFilterName={setFilterName}
        />
      <h3>Add a new</h3>
      <PersonForm 
          persons={persons} 
          newName={newName}
          newNumber={newNumber} 
          
          setPersons={setPersons}
          setNewName={setNewName}
          setNewNumber={setNewNumber}

          setNotificationMessage={setNotificationMessage}
        />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} setPersons={setPersons}
        showAll={showAll} filterName={filterName} />
      <Footer />
    </div>
  )
}


export default App
