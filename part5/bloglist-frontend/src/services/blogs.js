import axios from 'axios'
const baseUrl = '/api/blogs'
const userUrl = '/api/users'

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

export default { getAll, getUsersBlogs }
