
// import React, { useState } from 'react';

// const WeatherPage = () => {
//   const [location, setLocation] = useState('');
//   const [weatherData, setWeatherData] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const apiKey = 'be488f781b1ba278c29132727e6c323e';
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setWeatherData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {
//     setLocation(e.target.value);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="location">Location:</label>
//         <input
//           type="text"
//           id="location"
//           value={location}
//           onChange={handleChange}
//         />
//         <button type="submit">Get Weather</button>
//       </form>

//       {weatherData && (
//         <div>
//           <h2>Current Weather for {weatherData.name}</h2>
//           <p>Temperature: {weatherData.main.temp}°F</p>
//           <p>Wind Speed: {weatherData.wind.speed} mph</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeatherPage;

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux'
import { message} from 'antd'
import { useNavigate} from 'react-router-dom'

const WeatherPage = () => {
  const [location, setLocation] = useState('');
  const [forecastData, setForecastData] = useState(null);

  const apiKey = 'be488f781b1ba278c29132727e6c323e';

  useEffect(() => {
    const fetchForecastData = async () => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setForecastData(data.list);
      } catch (error) {
        console.error(error);
      }
    };

    if (location) {
      fetchForecastData();
    }
  }, [location]);

 

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const {user} =useSelector(state => state.user)
  const navigate = useNavigate()

  const handelLogout = ()=>{
    localStorage.clear()
    message.success("Logout Successfully ")
    navigate('/login')
  }
  return (
    <>
    <div className=''> 
    <div class="flex justify-center ">
  <div class="flex-auto  w-40">
  <div class='py-8 px-8 text-3xl'> Weather app Esa</div>
    
  </div>
 
  <div class="flex">
    <div class="flex justify-end items-center py-8 px-8">
  <div class='cursor-grab' onClick={handelLogout}><svg class="h-8 w-8 text-blue-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="9" />  <line x1="8" y1="12" x2="16" y2="12" />  <line x1="8" y1="12" x2="12" y2="16" />  <line x1="8" y1="12" x2="12" y2="8" /></svg></div>
  <div class='pl-4 text-3xl'> {user?.name}</div>
</div>     
  </div>
</div> 
    <div className='container mx-auto px-4 py-8 bg-slate-300'>
        <form  className="mb-8">
        <label htmlFor="location" className="block text-lg mb-2 font-medium text-gray-700">Location:</label>
        <div className="flex items-center">
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-lg py-2 px-4 mr-4 flex-1 text-lg"
            placeholder='Enter city'
          />
        </div>
      </form>


      {forecastData && (
        <div>
          <h2 className="text-2xl mb-4 font-medium">5-Day Forecast for {location}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4  ">
          {forecastData
            .filter((data, index) => index % 8 === 0) 
            .map((data) => (
                <div key={data.dt} className="bg-white border border-gray-300 rounded-lg p-4">
                <p className="text-lg font-medium mb-2">{moment(data.dt_txt).format('MMMM Do, YYYY')}</p>
                <p className="text-lg mb-2">Temperature: {data.main.temp}°F</p>
                <p className="text-lg mb-2">Wind Speed: {data.wind.speed} mph</p>
                {data.wind.speed > 5 && <svg class="h-8 w-8 text-blue-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />  <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />shita</svg>}
                {data.wind.speed < 5 && <svg class="h-8 w-8 text-blue-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3" />  <line x1="1" y1="1" x2="23" y2="23" /></svg>}

                </div>
            ))}
            </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default WeatherPage;








