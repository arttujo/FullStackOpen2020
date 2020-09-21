const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    if (body.password.length < 3) {
      throw {
        name: "ValidationError",
        message: `User validation failed: password: Path 'password' ('${body.password}') is shorter than the minimum allowed length (3).`,
      };
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
