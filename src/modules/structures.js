/**
 * Weather data (open weather) parser. It removes unecessary data from the obj
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {obj} weather the weather obj
 * @returns {obj} the parsed weather obj 
 */
module.exports.weatherDataParse = (weather) => {

  delete weather.lat;
  delete weather.lon;
  delete weather.timezone;
  delete weather.timezone_offset

  return weather;
}
