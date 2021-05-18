
/**
 * Get comma separated cities from req
 * @author Andrea Menegazzo
 * @date 2021-05-18
 * @param {objecy} req the request
 * @returns {array} the array of the cities
 */
const getCitiesFromQuery = (req) => {
  return req.query.cities.split(",");
}

module.exports = {
  getCitiesFromQuery
} 