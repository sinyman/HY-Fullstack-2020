const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for(blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await helper.setupTestUser()

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

    let user = await api
      .post('/api/login')
      .send({ username: 'tuser', password: 'testpass' })

    let response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(blogToAdd)

    let blogs = await helper.blogsInDB()
    let titles = blogs.map(blog => blog.title)
    expect(titles).toContain('Vänrikki Stoolin Tarinat')

    let authors = blogs.map(blog => blog.author)
    expect(authors).toContain('Johan Ludvig Runeberg')
  })

  test('POST request increases amount of blogs', async () => {
    let blogToAdd = new Blog({
      title: 'Kanteletar',
      author: 'Elias Lönnrot',
      url: '-',
      likes: 138000
    })

    let user = await api
      .post('/api/login')
      .send({ username: 'tuser', password: 'testpass' })

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
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

    let user = await api
      .post('/api/login')
      .send({ username: 'tuser', password: 'testpass' })

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
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

    let user = await api
      .post('/api/login')
      .send({ username: 'tuser', password: 'testpass' })

    let blog1 = new Blog({
      title: 'Elgskyttarne',
      author: 'Johan Ludvig Runeberg',
      url: '-',
      likes: 1000
    })
    let res1 = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(blog1)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let blog2 = new Blog({
      title: 'Kanteletar',
      author: 'Elias Lönnrot',
      url: '-'
    })

    let res2 = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(blog2)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let blog1Likes = res1.body.likes
    let blog2Likes = res2.body.likes

    expect(blog1Likes).toBe(1000)
    expect(blog2Likes).toBe(0)
  })

  test('Missing title and URL returns 400 Bad Request', async () => {
    let blog = new Blog({
      author: 'JL. Runeberg',
      likes: 3000
    })

    let user = await api
      .post('/api/login')
      .send({ username: 'tuser', password: 'testpass' })

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${user.body.token}`)
      .send(blog)
      .expect(400)
  })

  test('Adding blog without token doesn\'t work', async () => {
    let blog = new Blog({
      title: 'Kalevipoeg',
      author: 'Friedrich Reinhold Kreutzwald',
      url: 'www.kalevipoeg.ee'
    })

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close(true)
})
