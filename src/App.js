import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';



export default function App() {
  const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

  const [locations, setLocations] = useState('San Francisco');
  const [weather, setWeather] = useState({});
  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${WEATHER_API_KEY}&units=imperial`)
    .then(res => {
      console.log(res);
      setWeather(res.data)
    })
    .catch(err => {
      console.log(err)
      alert('There has been an error. Please re-enter the location.')
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${locations}&client_id=${UNSPLASH_API_KEY}`)
    .then(res => {
      console.log(res); 
      setPhotos(res.data.results[Math.floor(Math.random() * res.data.results.length)].urls.raw);
    })
    .catch(err => {
      console.log(err);
    })

  }, [locations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${WEATHER_API_KEY}&units=imperial`)
    .then(res => {
      setWeather(res.data)
    })
    .catch(err => {
      console.log(err);
      alert('There has been an error. Please re-enter the location.')
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${locations}&client_id=${UNSPLASH_API_KEY}`)
    .then(res => {
      setPhotos(res.data.results[Math.floor(Math.random() * res.data.results.length)].urls.raw);
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  return (
    <AppContainer>
        <h1>{(weather.name)}</h1>
        <img className="image" src={photos} alt="Your selected location" />
        <div className='search'>
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location"
          />
          <button onClick={handleSubmit}>Search Location </button>
        </div>

        <div className='weather'>
          <p className="temp">Forecast: {weather.weather[0].description}</p>
          <p className="temp">Current Temperature: {(weather.main.temp).toFixed()} &deg;F</p>
          <p className="temp">Real-feel Temperature: {(weather.main.feels_like).toFixed()} &deg;F</p>
          <p className="temp">Humidity: {weather.main.humidity}%</p>
          <p className="temp">Wind speed: {weather.wind.speed} mph</p>
        </div>
    </AppContainer>
  );

}

const AppContainer = styled.div`
display: flex;
flex-direction: column;
text-align: center;
margin: auto;
padding: 20px;
border: 1px solid #f038ff;
width: 30%;
background-color: white;

h1 {
  font-size: 2.5rem;
  color: #f038ff;
}
p {
  font-size: 1rem;
  color: black;
  font-weight: bold;
}
}
img {
  width: 50%;
  margin: 20px auto;
  border-radius: 5%;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
}
.search{
/* display: flex;
flex-direction: column;
justify-content: center;
margin: auto;
width: 30%; */
}
`



