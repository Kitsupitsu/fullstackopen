import { useEffect, useState } from "react"
import axios from "axios"

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState("")
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    const changeFilter = (event) => {
        setFilter(event.target.value)
    }

    return <div>
        <form>
            <label>Find countries: </label>
            <input value={filter} onChange={changeFilter}/>
        </form>
        <Countries countries={countries} filter={filter} setFilter={setFilter} setWeather={setWeather} weather={weather}/>
    </div>
}

const Countries = (props) => {
    var filtered = props.countries.filter(c => c.name.includes(props.filter));
    return <div>
        {filtered.length >= 10 
        ? "Too many matches, specify another filter" 
        : filtered.length === 1
        ? <CountryData country={filtered[0]} setWeather={props.setWeather} weather={props.weather}/>
        : filtered.map(country => <div>
            <label key={country.name}>{country.name} </label>
            <button onClick={() => props.setFilter(country.name)}>Show</button>
            </div>)}
    </div>
}

const CountryData = (props) => {
    var country = props.country;
    const headers = {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    };
    useEffect(() => {
        const params = { access_key: api_key, query: country.capital }
        axios.get('http://api.weatherstack.com/current?', {params})
        .then(response => {
            const resp = response.data;
            props.setWeather(resp.current);
        })
        .catch(error => {console.log(error)})
    }, [])
    return <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages:</h2>
        <ul>
            {country.languages.map(language => 
            <li key={language.name}>{language.name}</li>
            )}
        </ul>
        <img src={country.flag} height={"100"}/>
        <h2>Weather in {country.name}:</h2>
        {console.log(props.weather)}
        <p><b>Temperature: </b>{props.weather.temperature} celsius</p>
        <img src={props.weather.weather_icons}/>
        <p><b>Wind: </b>{props.weather.wind_speed} mph direction {props.weather.wind_dir}</p>
    </div>
    
}

export default App