import React, { useState } from 'react'
import blogService from '../services/blogs'

const ERROR = 'error'
const SUCCESS = 'success'

const BlogCreation = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { messageHandler, refresh, blogFormRef } = props

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
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      const newBlog = {
        title: title,
        author: author,
        url: url,
      }
      blogFormRef.current.toggleVisibility()
      blogService
        .createBlog(newBlog)
        .then((response) => {
          console.log(response)
          messageHandler(`Blog ${response.title} added!`, SUCCESS)
          setAuthor('')
          setTitle('')
          setUrl('')
          refresh()
        })
        .catch((e) => {
          console.log(e)
          messageHandler('error', ERROR)
        })
    } else {
      messageHandler('Error in login', ERROR)
    }
  }

  return (
    <div>
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" onChange={handleTitleChange} value={title}></input>
        </label>
        <br></br>
        <label>
          Author:
          <input
            type="text"
            onChange={handleAuthorChange}
            value={author}
          ></input>
        </label>
        <br></br>
        <label>
          Url:
          <input type="text" onChange={handleUrlChange} value={url}></input>
        </label>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
      <br></br>
    </div>
  )
}

export default BlogCreation
