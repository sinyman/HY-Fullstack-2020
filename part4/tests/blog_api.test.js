const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  for(blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})

describe('Backend GET-requests work correctly:', () => {
  test('Blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Correct amount of blogs returned', async () => {
    let response = await helper.blogsInDB()

    expect(response.length).toBe(6)
  })

  test('Has unique identifier named "id"', async () => {
    let response = await helper.blogsInDB()

    // not quite sure I understood the exercise correct, but I am verifying that
    // the blogs have an ID, by checking the first element
    expect(response[0].id).toBeDefined()
  })
})

describe('Backend POST-requests work correctly:', () => {
  test('POST adds correct user to DB', async () => {
    let blogToAdd = new Blog({
      title: 'Vänrikki Stoolin Tarinat',
      author: 'Johan Ludvig Runeberg',
      url: '-',
      likes: 5518000
    })

    let result = await blogToAdd.save()
    let blogs = await helper.blogsInDB()

    expect(result).toEqual(blogToAdd)
  })

  test('POST request increases amount of blogs', async () => {
    let blogToAdd = new Blog({
      title: 'Kanteletar',
      author: 'Elias Lönnrot',
      url: '-',
      likes: 138000
    })

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('POST request adds correct author and book', async () => {
    let blogToAdd = new Blog({
      title: 'Elgskyttarne',
      author: 'Johan Ludvig Runeberg',
      url: '-',
      likes: 1000
    })

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()

    const newAuthor = blogs.map(b => b.author)
    expect(newAuthor).toContain('Johan Ludvig Runeberg')

    const newTitle = blogs.map(b => b.title)
    expect(newTitle).toContain('Elgskyttarne')
  })

  test('Likes default to 0, unless specified', async () => {
    let blog1 = new Blog({
      title: 'Elgskyttarne',
      author: 'Johan Ludvig Runeberg',
      url: '-',
      likes: 1000
    })
    let res1 = await helper.saveBlog(blog1)

    let blog2 = new Blog({
      title: 'Kanteletar',
      author: 'Elias Lönnrot',
      url: '-'
    })
    let res2 = await helper.saveBlog(blog2)

    expect(res1.likes).toBe(1000)
    expect(res2.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close(true)
})
