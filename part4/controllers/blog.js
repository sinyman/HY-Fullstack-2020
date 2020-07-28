const mongoose = require('mongoose')
const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const config = require('../utils/config');


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

notesRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs)
  next()
})

notesRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const result = await blog.save().catch(error => next(error))

  response.status(201).json(result)
  next()
})

module.exports = notesRouter
