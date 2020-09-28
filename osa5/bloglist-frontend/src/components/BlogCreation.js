import React, { useState } from 'react'

const BlogCreation = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { createNewBlog } = props

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    createNewBlog({ title: title,author: author, url: url })
    setUrl('')
    setTitle('')
    setAuthor('')
  }

  return (
    <div>
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit} id="form">
        <label>
          Title:
          <input type="text" onChange={handleTitleChange} value={title} id="title"></input>
        </label>
        <br></br>
        <label>
          Author:
          <input
            id="author"
            type="text"
            onChange={handleAuthorChange}
            value={author}
          ></input>
        </label>
        <br></br>
        <label>
          Url:
          <input id="url"type="text" onChange={handleUrlChange} value={url}></input>
        </label>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
      <br></br>
    </div>
  )
}

export default BlogCreation
