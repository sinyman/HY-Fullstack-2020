import axios from 'axios'
const baseUrl = '/api/blogs'
const userUrl = '/api/users'

let token = null

// Called from main class
// eslint-disable-next-line
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUsersBlogs = (userToGet) => {
  const request = axios.get(userUrl)
  return request.then(response => {
    let user = response.data
      .find(user => user.username === userToGet.username)

      return user.blogs
  })
}

const create = (blog) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }

  let request = axios.post(baseUrl, blog, config)
  return request.then(response => {
    return {...response.data, isError: false }

  }).catch(error => {
    return {...error.response.data, isError: true }
  })
}

export default { getAll, getUsersBlogs, create, setToken }
