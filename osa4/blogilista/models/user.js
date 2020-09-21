const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
      type: String,
      unique: true,
      minlength: 3
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returdedObject) => {
    returdedObject.id = returdedObject._id.toString();
    delete returdedObject._id;
    delete returdedObject.__v;
    delete returdedObject.passwrodHash;
  },
});
userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema);
module.exports = User;
