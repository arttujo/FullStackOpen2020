const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

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

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const deletePerson = await Blog.findByIdAndDelete(id);
  if (deletePerson) {
    response.status(204).end();
  } else {
    response.status(400).json({ error: "Cannot delete" });
  }
});
// Here a put request just increaces the Like amount by one
blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  let obj = await Blog.findById(id);
  ++obj.likes;
  const updated = await Blog.findByIdAndUpdate(id, obj, { new: true });
  response.status(202).json(updated.toJSON());
});

module.exports = blogsRouter;
