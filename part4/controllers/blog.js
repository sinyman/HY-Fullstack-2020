const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config');
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('creator', { username: 1, name: 1 })

  response.json(blogs)
  next()
})

/*
 Helper method for veifying token to avoid code redundancy in routes.
 Should probably be put in some other file, but keeping it here since it isn't
 mandatory in course schedule.
 */
const verifyToken = req => {
  const token = req.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return [false, null]
    }
    return [true, decodedToken]
    
  } catch(error) {
    return [false, null]
  }
}

blogRouter.post('/', async (request, response, next) => {
  let [tokenValid, decodedToken] = verifyToken(request)
  if(tokenValid) {
    const user = await User.findById(decodedToken.id)

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

  } else {
    response.status(401).json({ error: 'Unauthorized: Token missing or invalid' })
  }
  next()
})

blogRouter.delete('/:id', async (request, response, next) => {
  let [tokenValid, decodedToken] = verifyToken(request)
  if(tokenValid) {
    const user = await User.findById(decodedToken.id)
    try {
      const toDelete = await Blog.findById(request.params.id)

      let userID = user._id

      if ( toDelete.creator.toString() === userID.toString() ) {
        await toDelete.remove()

        user.blogs = user.blogs.filter(blog => blog.id !== toDelete.id)
        await user.save()

        response.status(204).end()

      } else {
        response.status(401).json({ status: 401, message: 'Unauthorized' })
      }
    } catch(exception) {
      next({ status: 400, name:exception.name, message:`${ exception.name == 'CastError'? "Malformatted ID": exception.name}`})
    }
  } else {
    response.status(401).json({ error: 'Unauthorized: Token missing or invalid' })
  }

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
