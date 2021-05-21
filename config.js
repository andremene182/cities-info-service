//Environment
const env = process.env.NODE_ENV;

const development = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000,
  },
  urls: {
    openWeatherURL: 'https://api.openweathermap.org',
    yelpURL: 'https://api.yelp.com/v3'

  }
};

//Not really needed for the test
const production = {
  app: {
    port: parseInt(process.env.PRD_APP_PORT) || 3000,
  },
  urls: {
    openWeatherURL: 'https://api.openweathermap.org',
    yelpURL: 'https://api.yelp.com/v3'


  }
};
   
const config = {
  development,
  production
};

module.exports = config[env];


