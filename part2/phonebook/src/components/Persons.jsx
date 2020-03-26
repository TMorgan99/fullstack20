import React  from 'react'
import Person from './Person'
import personService from '.././services/persons'


const Persons = (props) => {
  const { filterName, showAll, persons, setPersons } = props


  // this method appears here, in this module because it
  // operates on one from the list.
  const remove = (id) => {
    personService.remove(id)
    setPersons(persons.filter(person => person.id !== id ))
  }

  const regex = RegExp(filterName, 'i')
  const personsToShow = showAll
    ? persons
    : persons.filter( e => regex.test(e.name) )

  return personsToShow.map( person =>
        <Person key={person.id} person={person} remove={remove} />
      )
}


export default Persons
