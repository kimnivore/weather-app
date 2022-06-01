import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';


export default function App() {
  const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

  const [location, setLocation] = useState('San Francisco');
  const [weather, setWeather] = useState({});
  const [photos, setPhotos] = useState({});
  const [description, setDescription] = useState([])


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_API_KEY}&units=imperial`)
    .then(res => {
      console.log(res);
      setWeather(res.data);
      setDescription(res.data.weather[0]);
    })
    .catch(err => {
      console.log(err)
      alert('There has been an error. Please select another city.')
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${location}&client_id=${UNSPLASH_API_KEY}`)
    .then(res => {
      setPhotos(res.data.results[Math.floor(Math.random() * res.data.results.length)].urls.raw);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_API_KEY}&units=imperial`)
    .then(res => {
      setWeather(res.data)
      setDescription(res.data.weather[0])
    })
    .catch(err => {
      console.log(err);
      alert('There has been an error. Please select another city.')
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${location}&client_id=${UNSPLASH_API_KEY}`)
    .then(res => {
      setPhotos(res.data.results[Math.floor(Math.random() * res.data.results.length)].urls.raw);
    })
    .catch(err => {
      console.log(err);
    })
  }

  function windDirection(degrees) {
    const value = Math.floor(degrees / 45) % 8;
    let directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      return directions[value];
  }

  return (
    
    <AppContainer>
        <h1>Weather Today</h1>
        <h2>{weather.name} </h2>
        <p className="weather-icon"><b>{weather?.main?.temp.toFixed()} &deg;F </b></p>
        <p className="weather-icon">{description.main}
          <img className='weather-icon' src={`http://openweathermap.org/img/wn/${description.icon}@2x.png`} alt='weather icon'/>
        </p> 
        <div className='search'>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="location"
          />
          <button onClick={handleSubmit}>Search Locations</button>
        </div>
        <img className="city-image" src={photos} alt='location' />
 
        <div className='weather'>
          <p className="temp">High: <b>{weather?.main?.temp_max.toFixed()} &deg;F </b> / Low: <b> {weather?.main?.temp_min.toFixed()} &deg;F </b></p>
          <p className="temp">Humidity: <b>{weather?.main?.humidity} % </b></p>
          <p className="temp">Wind speed: <b>{weather?.wind?.speed.toFixed()} mph {windDirection(weather?.wind?.deg)}</b></p>
        </div>

     
    </AppContainer>
  );

}

const AppContainer = styled.div`
display: flex;
flex-direction: column;
text-align: center;
margin: 20px auto;
width: 60%;
background-color: #f8f8ff;
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(4px);
border-radius: 5px;
border: 1px solid rgba(255, 255, 255, 0.18);

h1 {
  font-size: 2.5rem;
  color: #f038ff;
  margin-bottom: 0;
}
.weather-icon {
  width: auto;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.weather {
  margin: 20px;
}
.temp {
  font-size: 1rem;
  color: black;
  text-align: center;
  margin: auto;
}
.city-image{
  max-height: 300px;
  margin: 20px auto;
  border-radius: 10%;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
}
button{
  border-radius: 5px;
  background: #a9def9;
  padding: 10px;
  margin: 5px;
}
input {
  border-radius: 5px;
  padding: 10px;
}
@media (max-width: 820px) {
  width: 80%;
  .city-image {
    width: 70%;
  }
@media (max-width: 580px) {
  width: 90%;
  .city-image {
    width: 80%;
  }
}

`



