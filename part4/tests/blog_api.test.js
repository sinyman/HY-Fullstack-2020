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
    let response = await api.get('/api/blogs')

    expect(response.body.length).toBe(3)
  })

  test('Has unique identifier named "id"', async () => {
    let response = await api.get('/api/blogs')

    // not quite sure I understood the exercise correct, but I am verifying that
    // the blogs have an ID, by checking the first element
    expect(response.body[0].id).toBeDefined();
  });
})

afterAll(() => {
  mongoose.connection.close()
})
