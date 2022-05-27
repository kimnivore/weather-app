import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';



export default function App() {
  const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

  const [locations, setLocations] = useState('San Francisco');
  const [weather, setWeather] = useState({});
  const [photos, setPhotos] = useState({});


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
      setPhotos(res.data.results[Math.floor(Math.random() * res.data.results.length)]);
    })
    .catch(err => {
      console.log(err);
    })

  }, []);

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
      setPhotos(res.data.results[Math.floor(Math.random() * res.data.results.length)]);
    })
    .catch(err => {
      console.log(err);
    })
  }

 
  // const backgroundColor = (temp) => {
  //   let color='rgba(244,244,244,0.4)'
  
  //   if(weather.main.temp > 0 && weather.main.temp <= 40){
  //     color='rgba(50,97,214, 0.4)'
  //   }else if(weather.main.temp > 40 && weather.main.temp <= 60){
  //     color='rgba(244,244,244, 0.4)'
  //   }else if(weather.main.temp > 60 && weather.main.temp <= 80){
  //     color='rgba(244,204,0, 0.4)'
  //   }else if(weather.main.temp > 80){
  //     color='rgba(216,128,48, 0.4)'
  //   };
  //   (AppContainer).css('background',color)
  // };
  
  return (
    <AppContainer>
        <h1>{(weather.name)} </h1>
        <p className="weather-icon">{(weather.weather[0].description)[0].toUpperCase() + (weather.weather[0].description).substring(1) } 
        <img className='weather-icon' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
        </p> 
        <img className="city-image" src={photos.urls.raw} alt={photos.alt_description} />
        <div className='search'>
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location"
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        <div className='weather'>
          <p className="temp">Temperature: <b>{(weather.main.temp).toFixed()} &deg;F </b></p>
          <p className="temp">Humidity: <b>{weather.main.humidity} % </b></p>
          <p className="temp">Wind speed: <b>{(weather.wind.speed).toFixed()} mph </b></p>
        </div>
    </AppContainer>
  );

}

const AppContainer = styled.div`
display: flex;
flex-direction: column;
text-align: center;
margin: 20px auto;
width: 50%;
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


`



