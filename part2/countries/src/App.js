import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const CurrentWeather = ({location}) => {
  const WEATHERSTACK_URL = 'http://api.weatherstack.com/current'

  const [currentWeather, setCurrentWeather] = useState(undefined)

  useEffect( ()=> {
    const params = {
      access_key: process.env.REACT_APP__WEATHERSTACK_ACCESS_KEY,
      query: location
    }
    console.log(`query params: ${params}`)
    axios
      .get(WEATHERSTACK_URL, {params})
      .then(response => {
          setCurrentWeather(response.data.current)
        })
      .catch(error => `CurrentWeather: ${console.log(error)}`)
    },[location])

  return ( (currentWeather === undefined)
  ? <p> loading weather please wait ... </p>
  : <>
      <h3> Currently in {location} </h3>
      <p>
        temperature: {currentWeather.temperature} <br />
        precip: {currentWeather.precip} <br />
        wind: {currentWeather.wind_speed} {currentWeather.wind_dir} <br />
        {currentWeather.weather_descriptions[0]} <br />
        <img alt="weather icon" src={currentWeather.weather_icons[0]} />
      </p>
    </>
  )
}
 
 
const ListOne = ({country})=> {
  console.log( country )
  return (
    <>
    <h3>{country.name}</h3>
    <div>capital {country.capital} </div>
    <div>population {country.population} </div>
    <h4>Languages spoken</h4>
    <ul>
      { country.languages.map(l=>  <li key={l.name}>{l.name}</li> ) }
    </ul>
    <img height="200" src={country.flag} alt={`Flag of ${country.name}`}/>
    <CurrentWeather location={country.capital} />
    </>
    )
    
}


// Don't click on countries with parens!
// it clobbers the regex!
// not an easy fix to program
// for now, just edit the resulting searcg box to remove the parens
// but remove them both at the same time!
const ListFew = ({countries, click}) =>
    <>
      { countries.map(c=> {
          // const clickTarget = c.name.replace(/[()]/g, '')
          // console.log(clickTarget)
          return (
            <div key={c.name}>
            <button 
                onClick={()=>click(c.name)} key={c.name}>{c.name} 
            </button>
          </div> 
          )
        } 
      ) }
    </>


const App = () => {
  const RESTCOUNTRIES_URL = 'https://restcountries.eu/rest/v2/all'

  const [countries, setCountires] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get(RESTCOUNTRIES_URL)
      .then(response => {
        // console.log('promise fulfilled')
        // console.log(response.data)
        setCountires(response.data)
      })
  }, [])

// handle 'Q: query'
  const hQ = (event) => setQ(event.target.value)

  const regex = RegExp(q, 'i')
  const countriesShown = countries.filter( e => regex.test(e.name) )

  // console.log( 'render: ', `${countries.length}       was found`)
  // console.log( 'render: ', `${countriesShown.length}  was filtered`)

  // how to show the result depends on the length of the selection
  const selectDisplayStyle = () => {
    console.log( countriesShown )
    switch (countriesShown.length) {
      case 0:
        return 'none match'
      case 1:
        return <ListOne country={ countriesShown[0] } />
      case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10: 
        return <ListFew click={setQ} countries={ countriesShown }/>
      default:
        return 'too many to display'
    }
  }


  return ( 
    <>
    <div className="App"> 
      Find countries 
      <input autoFocus value={q} onChange={hQ} />
      <div>
      { selectDisplayStyle() }
      </div>
    </div>
    </>
   ) 
}


export default App
