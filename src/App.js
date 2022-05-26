import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const APIkey = '526154d7e1a163ec19dbe2350ad2b307';
const APPkey = 'GxhFZmDqR_wEHBjn-fnCKYBMJMIWCe4SDTapJbD_yWc';

export default function App() {

  const APIkey = '526154d7e1a163ec19dbe2350ad2b307';
  const [locations, setLocations] = useState('San Francisco');
  const [weather, setWeather] = useState({});
  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${APIkey}&units=imperial`)
    .then(res => {
      console.log(res);
      setWeather(res.data)
    })
    .catch(err => {
      console.log(err)
      alert('There has been an error. Please re-enter the location.')
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${locations}&client_id=${APPkey}`)
    .then(res => {
      console.log(res); 
      setPhotos(res.data.results[3].urls.raw);
    })
    .catch(err => {
      console.log(err);
    })

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${APIkey}&units=imperial`)
    .then(res => {
      setWeather(res.data)
    })
    .catch(err => {
      console.log(err);
      alert('There has been an error. Please re-enter the location.')
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${locations}&client_id=${APPkey}`)
    .then(res => {
      setPhotos(res.data.results[5].urls.raw);
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  return (
    <AppContainer>
    <WrapperContainer>

        <SearchContainer>
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={handleSubmit}>
            Search Location
          </button>
        </SearchContainer>

        <WeatherContainer>
          <p className="temp">Current Temperature: {weather?.main?.temp}</p>
        </WeatherContainer>

        <img className="app__image" src={photos} alt="" />

      </WrapperContainer>
    </AppContainer>
  );

}

const AppContainer = styled.div`
text-align: center;
width:
}
img {
  width: 30%;
}
`
const WrapperContainer = styled.div`
`
const SearchContainer = styled.div`
/* display: flex;
flex-direction: column;
justify-content: center;
margin: auto;
width: 30%; */
`
const WeatherContainer = styled.div`
`