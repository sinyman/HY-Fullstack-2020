import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.getUsersBlogs(user)
      .then(blogs => setBlogs(blogs))
    }
  }, [])

  // -- LOGIN FUNCTIONALITY --
  const loginFormHandler = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      blogService.getUsersBlogs(user)
      .then(blogs => setBlogs(blogs))

    } catch (exception) {
      //window.alert('Username or password invalid!')
      setNotification('Error: Username or password invalid!')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleChange = ({ target }) => {
    if(target.name === 'uname') {
      setUsername(target.value)
    } else {
      setPassword(target.value)
    }
  }

  const logout = () => {
    setUser(null)
    setBlogs([])
    window.localStorage.removeItem('loggedAppUser')
    blogService.setToken('')
    setNotification('')
  }

  // -- BLOG ADDING FUNCTIONALITY --
  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    }

    // TODO fix rerender problem så he tömber
    // inputs

    blogService
    .create(newBlog)
    .then(response => {
      setBlogTitle('')
      setBlogAuthor('')
      setBlogURL('')

      if(!response.isError) {
        setBlogs(blogs.concat(response))
        setNotification(`'${response.title}' by ${response.author} added!`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)

      } else {
        setNotification(`Error: ${response['message']}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    })
  }

  const handleBlogChange = ({ target }) => {
    if(target.name === 'blogTitle') {
      setBlogTitle(target.value)
    } else if(target.name === 'blogAuthor') {
      setBlogAuthor(target.value)
    } else {
      setBlogURL(target.value)
    }
  }

  // -- RENDERING APP --
  if(!user) {
    return (
      <div>
        <Notification message={notification} />
        <LoginForm formHandler={loginFormHandler} changeHandler={handleChange} />
      </div>
    )
  }
  return (
    <div>
      <button onClick={logout}>Log out</button>
      <Notification message={notification} />
      <BlogCreationForm submit={addBlog} changeHandler={handleBlogChange} />
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

export default App
