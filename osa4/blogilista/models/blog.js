const mongoose = require('mongoose')
const config = require('../utils/config')
const logger  = require('../utils/logger')

logger.info('Connecting to', config.MONGODB_URI)
mongoose.set('useFindAndModify',false)
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    logger.info('Connected to MongoDB')
  })
  .catch((e) => {
    logger.error("Error connecting to MongoDB",e.message)
  })


  const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  blogSchema.set('toJSON',{ transform:(document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  } })  
  const Blog = mongoose.model('Blog', blogSchema)
  
  module.exports = Blog