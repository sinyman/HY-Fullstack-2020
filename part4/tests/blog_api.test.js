const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Backend is working correctly:', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(3)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
