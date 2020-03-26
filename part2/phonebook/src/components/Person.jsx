import React  from 'react'


const Person = ({person, remove}) =>
      <div>
        <button onClick={()=>remove(person.id)}> x </button>
          {person.name} {person.number}
       </div>

export default Person
