import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const loginFormHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      window.alert('Username or password invalid!')
    }
  }

  const handleChange = (event) => {
    if(event.target.name === 'uname') {
      setUsername(event.target.value)
    } else {
      setPassword(event.target.value)
    }
  }

  if(user) {
    return (
      <div>
        <h2>{user.name}'s blogs</h2>
        <ul>
          {blogs.map(blog =>
            <li key={blog.id}>
            <Blog blog={blog} />
            </li>
          )}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <LoginForm formHandler={loginFormHandler} changeHandler={handleChange} />
    </div>
  )
}

export default App
