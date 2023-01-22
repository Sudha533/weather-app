import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import weatherData from "./Data.json";


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=5285000b29c7b3cfa13d152b939087f7`;
  const searchLocation = (e) =>{
    if(e.key === "Enter"){
      axios.get(url)
      .then((response)=>{
        setData(response.data);
        console.log(response.data)
      });
      setLocation("");

    }
    
  }
  return (
    <main className="App">
      <div className='search'>
        <input 
        value={location}
        onChange ={e => setLocation(e.target.value)}
        onKeyDown = {searchLocation}
        placeholder="Enter Location"
        type="text"/>
      </div>
      
      <section className="container">
      <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main? <h1>{data.main.temp.toFixed()}°F</h1>:null}
          </div>
          <div className="description">
            {data.weather?<p>{data.weather[0].main}</p>:null}
          </div>
       </div>
       {data.name != undefined &&
        <div className='bottom'>
        <div className='feelsLike'>
          {data.main?<p>{data.main.feels_like.toFixed()}°F</p>:null}
            <p>Feels like</p>
        </div>
        <div className='humidity'>
            {data.main?<p>{data.main.humidity}</p>:null}
            <p>Humidity</p>
        </div>
        <div className='wind'>
            {data.wind?<p>{data.wind.speed.toFixed()} MPH</p>:null}
            <p>Wind Speed</p>

        </div>
     </div>

       }
      
       </section>
    </main>
  );
}

export default App;
