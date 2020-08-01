const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config');

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('creator', { username: 1, name: 1 })

  response.json(blogs)
  next()
})

blogRouter.post('/', async (request, response, next) => {
  let user = await User.find({})
  user = user[0]

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    creator: user._id
  })

  let result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
  next()
})

blogRouter.delete('/:id', async (request, response, next) => {
  let toDelete = await Blog.findById(request.params.id)
  toDelete? response.status(204).end(): response.status(404).end()
  next()
})

blogRouter.put('/:id', async (request, response, next) => {
  let body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const options = {
    runValidators: true,
    new: true,
    context: 'query'
  }

  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, options)
  response.json(updatedBlog)
  next()
})

module.exports = blogRouter
