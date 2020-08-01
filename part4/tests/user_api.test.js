const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for(user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

describe('USER HTTP-POST:', () => {
  test('User creation works correctly', async () => {
    const userToCreate = {
      name: "elonn",
      username: "Elias Lönnrot",
      password: "2cool4school"
    }

    const response = await api
      .post("/api/users")
      .send(userToCreate)

    let blogs = await helper.usersInDB()
    expect(blogs)
      .toContainEqual(expect.objectContaining(response.body));
  })

  test('Invalid user is not created', async () => {
    const invUser = {
      username: "kzuse",
      name: "Konrad Zuse",
      password: "",
    }

    let response = await api
      .post('/api/users')
      .send(invUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    let users = await helper.usersInDB()
    let unames = users.map(user => user.username)

    expect(unames).not.toContain('kzuse')
    expect(users).toHaveLength(helper.initialUsers.length)
    expect(response.error.text).toContain('Password of min length 3 is required')
  })
})

afterAll(() => {
  mongoose.connection.close(true)
})
