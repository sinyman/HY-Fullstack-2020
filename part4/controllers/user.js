const userRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config');
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', {})

  response.status(200).json(users)
  next()
})

userRouter.post('/', async (request, response, next) => {
  const saltRounds = 10
  pw = request.body.password

  if(pw.length >= 3) {
      const passwordHash = await bcrypt.hash(pw, saltRounds)
      const userToAdd = new User({
        username: request.body.username,
        name: request.body.name,
        passwordHash,
        blogs: []
      })

      const savedUser = await userToAdd.save()

      response.status(201).json(savedUser)
      next()
  } else {
    response.status(400)
    .json({
      error: 'Password of min length 3 is required'
    })
  }
})

module.exports = userRouter
