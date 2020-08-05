const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const initialBlogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
  { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
  { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
  { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 },
]
const initialUsers = [
  { _id: "5a422a851b54a676234d17f7", username: "sinyman", author: "Simon Nyman", passwordHash: "$2a$10$wfiSFatJqrqFQR7lBYHkAe7Cx4v3qhWS7.DS3QzAZGzPZLWYE4l2C", __v: 0 },
  { _id: "5a422aa71b54a676234d17f8", username: "sjobs", author: "Steve Jobs", passwordHash: "$2a$10$wfiSFatJqrqFQR7lBYHkAe7Cx4v3qhWS7.DS3QzAZGzPZLWYE4l2C", __v: 0 },
  { _id: "5a422b3a1b54a676234d17f9", username: "bgates", author: "Bill Gates", passwordHash: "$2a$10$wfiSFatJqrqFQR7lBYHkAe7Cx4v3qhWS7.DS3QzAZGzPZLWYE4l2C", __v: 0 },
  { _id: "5a422b891b54a676234d17fa", username: "dijkstra", author: "Edsger Dijkstra", passwordHash: "$2a$10$wfiSFatJqrqFQR7lBYHkAe7Cx4v3qhWS7.DS3QzAZGzPZLWYE4l2C", __v: 0 },
]

const setupTestUser = async () => {
  const passwordHash = await bcrypt.hash('testpass', 10)
  const userToAdd = new User({
    username: 'tuser',
    name: 'Test User',
    passwordHash,
    blogs: []
  })

  await userToAdd.save()
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'DELET DIS' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const saveBlog = async (blog) => {
  return await blog.save()
}

module.exports = {
  initialBlogs,nonExistingId, blogsInDB, saveBlog,
  initialUsers, usersInDB, setupTestUser
}
