const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response,next) => {
  try{
    const body = request.body;
    const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedToken.id){
    return response.status(401).json({error: "token missing or invalid"})
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    response.status(400).json({ error: "title or url can't be undefined" });
  } else {
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    });
    const saved = await blog.save();
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
    response.status(201).json(saved.toJSON());
  }
  } catch(e){
    next(e)
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
