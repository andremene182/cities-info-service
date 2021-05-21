# enhancers-test
Test for Enhancers S.p.A.

## Installation
Use npm install to install all the dependencies.

## Usage
The service can be called in GET mode at the /cities-info endpoint with the following parameters: 

  cities -> comma separated cities, maximum 5. 
  ex: milan,padua,bologna,new york,madrid
  
  weather -> desired type of weather data set, also separated by comma. 
  Accepted parameters: hourly,minutely,daily,current,alerts
  Default: daily, current
  
  businesses_sort -> sorting mode of the businesses of the city. 
  Accepted parameters: match, rating, review, distance. 
  Default: rating
  
  Example of request: 
  https://yoursite/v1/cities-info?cities=milano,padova,bologna,venezia,madrid&weather=daily&businesses_sort=distance
  
  The service response is an array of objects (one for each requested city) containing this information:
  [
    {
      {location: 
        lat, 
        lon,
        city_name}, 
      {weather: [weather info]}
      {businesses: [businesses info]}
      }
  ]
