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

const getToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const verifyToken = req => {
  const token = getToken(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return [false, null]
  }
  return [true, decodedToken]
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
    return response.status(401).json({ error: 'Unauthorized: Token missing or invalid' })
  }
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
