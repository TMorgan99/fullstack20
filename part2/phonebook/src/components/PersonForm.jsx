import React  from 'react'
import personService from '.././services/persons'


const PersonForm = (props) => {
  const { persons, newName, newNumber, setPersons, setNewName, setNewNumber, setNotificationMessage } = props

  const showMessage = message => {
    setNotificationMessage( { text: message } )
    setTimeout(() => {setNotificationMessage(null)}, 5000)
  }

  const showErrorMessage = message => {
    setNotificationMessage( { text: message, isError: true } )
    setTimeout(() => {setNotificationMessage(null)}, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,    // assigned on server
    }

    const found = persons.find(e => e.name === newName)
    if (found) {
      // window.alert(`Sorry ${newName}, but you are already in the list,  ID: ${found.id}`)
      if (window.confirm(`${newName} is already in the list\nDid you want to update the information?`) ) {
        console.log('update item: ', found.id)
        personService.update( found.id, personObject )
          .then(newRecord => {
            const newPersons = persons.map( item => item.id === found.id ? newRecord : item )
            setPersons(newPersons)
            })
          .then( ()=> showErrorMessage(`Note: '${personObject.name}' has a new number`) )
          .catch( error => {
            console.log(error)
            showErrorMessage( error.description ) 
            // now, delete the record, to sync with server.
            personService.remove(found.id)
          })
      } // if window.confirm
      else { 
        console.log('update declined')
      }
    } else {  // not found, just create.
      personService.create(personObject)
        .then((response) => {
          setPersons(persons.concat(response))  // use response, as server has added 'id' here.
          }
        )
        .then( ()=> showMessage(`Note: '${personObject.name}' is added to the phonebook`) )
    }
    // in either case. clean up the form.
    setNewName('')
    setNewNumber('')
    // set Focus back to name field?
    document.getElementById("newName").focus()
  }

  const handle_newName = (event) => {
    setNewName(event.target.value)
  }

  const handle_newNumber = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <form onSubmit={addPerson} >
      <div>
        name: <input 
          id='newName'
          autoFocus
          onChange={handle_newName}
          value={newName}
          />
      </div>
      <div>
        number: <input 
          onChange={handle_newNumber}
          value={newNumber}
          />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

export default PersonForm
