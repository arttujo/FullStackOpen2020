const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    response.status(400).json({ error: "title or url can't be undefined" });
  } else {
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
    });
    const saved = await blog.save();
    response.status(201).json(saved.toJSON());
  }
});

module.exports = blogsRouter;
