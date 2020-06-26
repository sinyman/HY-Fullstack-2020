
import axios from 'axios'

const baseURL = 'https://restcountries.eu/rest/v2/'
//const ea = 'https://restcountries.eu/rest/v2/name/eesti'

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

export default { getAll, getBySearch }
