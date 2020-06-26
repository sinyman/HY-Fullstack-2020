import axios from 'axios'

const baseURL = 'https://restcountries.eu/rest/v2/'

const api_key = process.env.REACT_APP_API_KEY
const weatherURL = "http://api.weatherstack.com/current?access_key="+api_key+"&query="

const getAll = () => {
  const request = axios.get(baseURL + 'all')

  return request.then(response => {
    return response.data
  })
}

const getBySearch = (query) => {
  const request = axios.get(baseURL + 'name/'+query)

  return request.then(response => {
    return response.data
  })
}

const getWeather = (town) => {
  const request = axios.get(weatherURL + town)

  return request.then(response => {
    return response.data
  })
}

export default { getAll, getBySearch, getWeather }
