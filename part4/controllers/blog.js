const mongoose = require('mongoose')
const notesRouter = require('express').Router()
const Blog = require('../models/blog')
const config = require('../utils/config');


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

notesRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
      next()
    })
})

notesRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
      next()
    })
    .catch(error => next(error))
})


module.exports = notesRouter
