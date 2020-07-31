const userRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config');
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response, next) => {
  const users = await User.find({})

  response.status(200).json(users)
})

userRouter.post('/', async (request, response, next) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

  const userToAdd = new User({
    username: request.body.username,
    name: request.body.name,
    passwordHash,
  })

  const savedUser = await userToAdd.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter
