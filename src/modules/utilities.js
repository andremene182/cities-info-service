/**
 * Get comma separated cities from req
 * @author Andrea Menegazzo
 * @date 2021-05-18
 * @param {objecy} req the request
 * @returns {array} the array of the cities
 */
const getCitiesFromQuery = (req) => {
  var cities = req.query.cities.split(",");
  if (cities.length > 5) {
    throw new Error('Warning! You can request no more than 5 cities data.');
  } else return cities;
}

/**
 * Get weather data set to exclude (based on openWeather API rules)
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {object} req the request
 * @returns {string} comme separated weather set to exclude
 */
const getWeatherToExcFromQuery = (req) => {

  var toExclude = ['hourly', 'minutely', 'daily', 'current', 'alerts'];
  const toExcludeDef = 'hourly,minutely,alerts';

  if (req.query.weather) {
    var weatherSet = req.query.weather.split(",");
    var excluded = 0;
    weatherSet.forEach(element => {
      var index = toExclude.indexOf(element);
      if (index > -1) {
        toExclude.splice(index, 1);
        excluded++;
      }
    });
    if (excluded > 0)
      return toExclude.join(',');
  }  
  
  return toExcludeDef;

}

/**
 * Get businesses sort method (based on Yelp rules)
 * This is a match method (enhancers-test api:yelp)
 * @author Andrea Menegazzo
 * @date 2021-05-20
 * @param {obj} req the request
 * @returns {string} the sort method
 */
const getBusinessesSortFromQuery = (req) => {

  const simplifiedSort = 
  {
    match: 'best_match',
    rating: 'rating',
    review:'review_count',
    distance:'distance'
  }

  if (req.query.businesses_sort) {
    var sort = req.query.businesses_sort;
    if (simplifiedSort[sort])
      return simplifiedSort[sort];
  } 
  return 'rating';
  
}

module.exports = {
  getCitiesFromQuery,
  getWeatherToExcFromQuery,
  getBusinessesSortFromQuery
} 