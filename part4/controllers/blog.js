const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const config = require('../utils/config');

notesRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs)
  next()
})

notesRouter.post('/', async (request, response, next) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  })

  let result = await blog.save()
  response.status(201).json(result)
  next()
})

notesRouter.delete('/:id', async (request, response, next) => {
  let toDelete = await Blog.findById(request.params.id)
  toDelete? response.status(204).end(): response.status(404).end()
  next()
})

notesRouter.put('/:id', async (request, response, next) => {
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

module.exports = notesRouter
