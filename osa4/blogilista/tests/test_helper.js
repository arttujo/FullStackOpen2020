const app = require("../app");
const supertest = require("supertest");

const api = supertest(app);


const Blog = require('../models/blog')
const User = require('../models/user');
const logger = require("../utils/logger");

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const blogsInDb = async ()=>{
      const blogs = await Blog.find({})
      return blogs.map(blog=>blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  const testUserLogin = async () => {
    const testUser = {username: "test123",password: "test123"}
    const login = await api.post('/api/login').send(testUser).expect(200)
    const token = login.body.token
    return token
  }

  module.exports = {
      initialBlogs,blogsInDb, usersInDb, testUserLogin
  }