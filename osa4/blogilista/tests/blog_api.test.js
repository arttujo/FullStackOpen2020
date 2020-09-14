const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

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
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const authors = blogsAtEnd.map((b) => b.author);
  expect(authors).toContain("Arttu Jokinen");
});

test("field must be id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("likes must be 0 if not given", async () => {
  const newBlog = {
    author: "Arttu Jokinen",
    title: "Arttus Javascript",
    url:
      "https://github.com/arttujo/FullStackOpen2020/tree/master/osa4/blogilista",
    likes: undefined,
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  expect(response.body.likes).toBe(0);
});

test("400 response if no title or url is present", async () => {
  const newBlog = {
    author: "Arttu Jokinen",
    title: undefined,
    url: undefined,
    likes: 0,
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
});

afterAll(() => {
  mongoose.connection.close();
});
