var express = require('express');
var router = express.Router();

const utilities = require ('../../../src/modules/utilities');
const {getCityInfoRequests, getCoordinatesRequests, parseCoordinatesResponses, parseCitiesInfoResponse} = require ('../../../src/modules/citiesInfo');

const check = require('../../../src/middlewares/checkParams');

//dev
router.get('/', check.requiredParams(['cities']), async(req, res, next) => {

  var coordinatesArr, coordinatesResponses, cities;
  
  try {
    cities = utilities.getCitiesFromQuery(req);
  } catch (e) {
    e.status = 400;
    next(e);
  }

  const weatherToExc = utilities.getWeatherToExcFromQuery(req);
  const businessesSort = utilities.getBusinessesSortFromQuery(req);

  try {
    coordinatesResponses = await Promise.all(getCoordinatesRequests(cities));
    coordinatesArr = parseCoordinatesResponses(coordinatesResponses);
  } catch (e) {
    e.message = "Please check your params. One or more cities in your request doesn't exist."
    next(e);
  }

  var citiesInfoPromises = getCityInfoRequests(coordinatesArr, weatherToExc, businessesSort);
  
  try {
    Promise.all(citiesInfoPromises.map(Promise.all, Promise))
    .then(items =>{
      res.json(parseCitiesInfoResponse(items, coordinatesArr));
    });
  } catch (e) {
    e.message = "Service error. Please check your params and retry."
    next(e)
  }

});

module.exports = router;