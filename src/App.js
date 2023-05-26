import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  // State variables
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  // API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d9aaf8957a884fd9a17d028506ed7617`;

  
  // Function to search location and fetch weather data
const searchLocation = (event) => {
  if (event.key === 'Enter') {
    // When the Enter key is pressed

    // Make an API request to fetch weather data for the entered location
    axios.get(url).then((response) => {
      // Once the response is received, update the 'data' state with the fetched weather data
      setData(response.data);
      console.log(response.data); // Log the response data to the console for debugging
    });

    setLocation(''); // Clear the search input by resetting the 'location' state
  }
};

  return (
    <div className='app'>
      {/* Search bar */}
      <div className='search'>
        <input
          type='text'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter city name...'
        />
      </div>

      {/* Weather information */}
      <div className='top'>
        <div className='location'>
          <p>{data.name}</p>
        </div>
        <div className='temp'>
          {data.main ? <h1>{data.main.temp}°F</h1> : null}
        </div>
        <div className='description'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      {/* Additional weather details */}
      {data.name !== undefined && (
        <div className='bottom'>
          <div className='feels'>
            {data.main ? <p className='bold'>{data.main.feels_like}</p> : null}
            <p>Feels like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.main ? <p className='bold'>{data.wind.speed}Mph</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
