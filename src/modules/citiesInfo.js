const axios = require('axios').default;
const config = require('../../config');



module.exports.getCoordinatesFromCity = async (city) => {
  try {
    const response = await axios.get(config.urls.openWeatherURL + '/geo/1.0/direct?q='+ city + '&limit=1&appid=' + process.env.OPEN_WEATHER_API_KEY);
    console.log(response);
    if (response){
      const coordinates = {lat: response.data[0].lat, lon: response.data[0].lon}
      return coordinates;
    } else {
      throw new Error('no city');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports.getCityWeather = async (lat, lon) => {
  try {
    const response = await axios.get(config.urls.openWeatherURL + '/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&appid=' + process.env.OPEN_WEATHER_API_KEY);
    if (response){
      return response.data;
    } else {
      throw new Error('no weather');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports.getCityBusinnesses = async (lat, lon) => {

  const callConfig = {
    headers:  { Authorization: 'Bearer ' + process.env.YELP_API_KEY }
  };

  try {
    const response = await axios.get(config.urls.yelpURL + '/businesses/search?latitude=' + lat + '&longitude=' + lon + '&limit=10&sort_by=rating', callConfig);
    if (response){
      return response.data;
    } else {
      throw new Error('no businnesses');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
