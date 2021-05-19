var express = require('express');
var router = express.Router();

const utilities = require ('../../../src/modules/utilities');
const {getCoordinatesFromCity, getCityWeather, getCityBusinnesses} = require ('../../../src/modules/citiesInfo');


router.get('/', async(req, res) => {

  var i=0;

  var cities = utilities.getCitiesFromQuery(req);

  /*for (i; i<cities.length; i++) {
    var {lat, lon} = await getCoordinatesFromCity(cities[i]);

    //console.log(lat,lon);

    var weather = await getCityWeather(lat,lon);

    //console.log(weather);
    
    var businesses = await getCityBusinnesses(lat,lon);
    //console.log(businesses);

  }
*/
  res.json({test: 'test'});

  /*cities.forEach(async(city) => {
    console.log( getCoordinatesFromCity(city));
    //console.log(await getCoordinatesFromCity(city));
  });*/

});

module.exports = router;