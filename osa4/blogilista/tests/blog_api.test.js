const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("test123", 10);
  const user = new User({ username: "test123", passwordHash });

  await user.save();
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 2 blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("the first blog is authored by Michael Chan", async () => {
  const response = await api.get("/api/blogs");
  const authors = response.body.map((r) => r.author);
  expect(authors).toContain("Michael Chan");
});

test("a valid blog can be added ", async () => {
  const token = await helper.testUserLogin();
  const newBlog = {
    author: "Arttu Jokinen",
    title: "Arttus Javascript",
    url:
      "https://github.com/arttujo/FullStackOpen2020/tree/master/osa4/blogilista",
    likes: 5,
  };
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const authors = blogsAtEnd.map((b) => b.author);
  expect(authors).toContain("Arttu Jokinen");
});

test("a valid blog cannot be added without a token", async () => {
  const newBlog = {
    author: "Arttu Jokinen",
    title: "Arttus Javascript",
    url:
      "https://github.com/arttujo/FullStackOpen2020/tree/master/osa4/blogilista",
    likes: 5,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

test("field must be id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("likes must be 0 if not given", async () => {
  const token = await helper.testUserLogin();
  const newBlog = {
    author: "Arttu Jokinen",
    title: "Arttus Javascript",
    url:
      "https://github.com/arttujo/FullStackOpen2020/tree/master/osa4/blogilista",
    likes: undefined,
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  expect(response.body.likes).toBe(0);
});

test("400 response if no title or url is present", async () => {
  const token = await helper.testUserLogin();
  const newBlog = {
    author: "Arttu Jokinen",
    title: undefined,
    url: undefined,
    likes: 0,
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});


test("like a blog", async () => {
  const response = await api
    .put(`/api/blogs/${helper.initialBlogs[0]._id}`)
    .send(helper.initialBlogs[0])
    .expect(202);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
