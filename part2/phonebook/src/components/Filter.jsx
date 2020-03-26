import React  from 'react'


const Filter = (props) => {
const { showAll, setShowAll, filterName, setFilterName } = props

const handle_newFilter = (event) => {
  // console.log(event.target.value)
  setFilterName(event.target.value)
}


  return (
    <div>
      names: <input 
          onChange={handle_newFilter}
          value={filterName}
      />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'some' : 'all' } names
      </button>
    </div>
  )
}

export default Filter
