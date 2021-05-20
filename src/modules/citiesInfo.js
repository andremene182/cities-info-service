const axios = require('axios').default;
const config = require('../../config');
const https = require('https');

const {weatherDataParse} = require('../modules/structures');

axios.create({
  httpsAgent: new https.Agent({keepAlive: true}),
});

/**
 * Get request for latitude and longitude from city name (open weather api)
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {string} city the city name
 * @returns {promise} the request
 */
module.exports.getCoordinatesFromCity = (city) => {
  var request = axios.get(config.urls.openWeatherURL + '/geo/1.0/direct?q='+ city + '&limit=1&appid=' + process.env.OPEN_WEATHER_API_KEY);
  return request;
}

/**
 * Get request for city weather
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {string} lat the city latitude
 * @param {string} lon the city longitude
 * @param {string} weatherToExc the weather dataset to exclude
 * @returns {promise} the request
 */
module.exports.getCityWeather = async(lat, lon, weatherToExc) => {
  var request = axios.get(config.urls.openWeatherURL + '/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=' + weatherToExc +'&appid=' + process.env.OPEN_WEATHER_API_KEY);
  return request;  
}

/**
 * Get request for city businesses (yelp)
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {string} lat the city latitude
 * @param {string} lon the city longitude
 * @param {string} businessesSort the sorting param
 * @returns {promise} the request
 */
module.exports.getCityBusinesses = async(lat, lon, businessesSort) => {

  const callConfig = {
    headers:  { Authorization: 'Bearer ' + process.env.YELP_API_KEY }
  };
  var request = axios.get(config.urls.yelpURL + '/businesses/search?latitude=' + lat + '&longitude=' + lon + '&limit=10&sort_by=' + businessesSort, callConfig);
  
  return request;
}

/**
 * Get array of promises requests for get multiple cities coordinates
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {array} cities the cities
 * @returns {array} the promises array
 */
module.exports.getCoordinatesRequests=(cities)=>{
  var i=0;
  var coordinatesRequests = [];
  for (i; i<cities.length; i++) {
    coordinatesRequests.push(this.getCoordinatesFromCity(cities[i]));
  }
  return coordinatesRequests;
}

/**
 * Parse coordinates responses from openweather in a simple object
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {obj} coordinatesResponses the coordinates responses
 * @returns {obj} the object containing lat,lon and city name for every city
 */
module.exports.parseCoordinatesResponses=(coordinatesResponses)=>{
  var lat, lon, cityName;
  const coordinates = coordinatesResponses.map(item => {
    lat = item.data[0].lat;
    lon = item.data[0].lon;
    cityName = item.data[0].name;
    return {lat, lon, city_name:cityName}
    }
  );

  return coordinates;

}


/**
 * Get array of promises requests for get multiple cities info
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {array} coordinates the array of coordinates object
 * @param {string} weatherToExc the weather data set to exclude (comma separated)
 * @param {string} businessesSort the businesses sort type (yelp)
 * @returns {array} the multidimensional array of promises requests
 */
module.exports.getCityInfoRequests = (coordinates, weatherToExc, businessesSort) => { 

  var citiesInfoRequests = [];
  var i = 0;

  for (i; i<coordinates.length; i++) {
    citiesInfoRequests[i] = [this.getCityWeather(coordinates[i].lat,coordinates[i].lon, weatherToExc), this.getCityBusinesses(coordinates[i].lat,coordinates[i].lon, businessesSort)];
  }
  return citiesInfoRequests;
}


/**
 * Parse cities info response
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {array} citiesInfoResponse the array of city info response obj
 * @param {array} coordinatesArr the array of coordinates obj
 * @returns {array} the array of location, weather and businesses of the cities
 */
module.exports.parseCitiesInfoResponse=(citiesInfoResponse, coordinatesArr)=>{
  
  var i = 0;
  var weather, businesses, coordinates; 
  const citiesInfo = citiesInfoResponse.map(item => {
    weather = weatherDataParse(item[0].data);
    businesses = item[1].data.businesses;
    coordinates = coordinatesArr[i];
    i++;
    return {location: coordinates, weather,businesses}
    }
  );

  return citiesInfo;

}