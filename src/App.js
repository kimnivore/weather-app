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
    // handleSubmit();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${WEATHER_API_KEY}&units=imperial`)
    .then(res => {
      setWeather(res.data);
      setDescription(res.data.weather[0]);
    })
    .catch(err => {
      console.log(err)
      alert('There has been an error. Please re-enter the location.')
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
      alert('There has been an error. Please re-enter the location.')
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${location}&client_id=${UNSPLASH_API_KEY}`)
    .then(res => {
      setPhotos(res.data.results[Math.floor(Math.random() * res.data.results.length)].urls.raw);
    })
    .catch(err => {
      console.log(err);
    })
  }
  const temp = weather?.main?.temp.toFixed();
  const humidity = weather?.main?.humidity;
  const wind = weather?.wind?.speed.toFixed();
  // const icon = weather?.weather[0].main;


  return (
    
    <AppContainer>
      
        <h1>{(weather.name)} </h1>
        <h2>Weather</h2>
        <p className="weather-icon">{description.main}
          <img className='weather-icon' src={`http://openweathermap.org/img/wn/${description.icon}@2x.png`} alt='weather icon'/>
        </p> 

    
        <img className="city-image" src={photos} alt='location' />
        <div className='search'>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="location"
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        <div className='weather'>
          <p className="temp">Temperature: <b>{temp} &deg;F </b></p>
          <p className="temp">Humidity: <b>{humidity} % </b></p>
          <p className="temp">Wind speed: <b>{wind} mph </b></p>
        </div>
    </AppContainer>
  );

}

const AppContainer = styled.div`
display: flex;
flex-direction: column;
text-align: center;
margin: 20px auto;
width: 90%;
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

.weather {
  margin: 20px;
}
.temp {
  font-size: 1rem;
  color: black;
  text-align: center;
  padding: 5px;
  margin: auto;
}
.weather-icon {
  width: auto;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.city-image{
  max-height: 300px;
  margin: 20px auto;
  border-radius: 10%;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.2);
}
button{
  border-radius: 5px;
  background: #ebf7f7;
  padding: 10px;
}
input {
  border-radius: 5px;
  padding: 10px;
}
@media (max-width: 820px) {
  .city-image {
    max-height: 200px;
  }
@media (max-width: 300px) {
  .city-image {
    max-height: 100px;
  }
}

`



