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

  const result = await blog.save()
  response.status(201).json(result)
  next()
})

notesRouter.delete('/:id', async (request, response, next) => {
  let toDelete = await Blog.findById(request.params.id)
  toDelete? response.status(204).end(): response.status(404).end()
  next()
})

module.exports = notesRouter
