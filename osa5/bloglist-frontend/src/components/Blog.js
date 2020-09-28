import React, { useState } from 'react'
import blogService from '../services/blogs'
const ERROR = 'error'
const SUCCESS = 'success'
const Blog = ({ blog, messageHandler, refreshData, likeBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }



  const removeBlog = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (window.confirm(`Are you sure you want to remove ${blog.title}`)) {
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)

        blogService
          .deleteBlog(blog)
          .then((response) => {
            if (response.status === 204) {
              messageHandler('Blog Deleted!', SUCCESS)
              refreshData()
            }
          })
          .catch((e) => {
            console.log(e)
            messageHandler(e, ERROR)
          })
      } else {
        messageHandler('Account error', ERROR)
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author + ' '}
        <button onClick={() => setBlogVisible(true)}>Show</button>
      </div>
      <div style={showWhenVisible}>
        Title: {blog.title + ' '}
        <button onClick={() => setBlogVisible(false)}>hide</button>
        <br></br>
        URL: {blog.url}
        <br></br>
        Likes: {blog.likes + ' '}
        <button
          onClick={() => {
            likeBlog(blog)
          }}
        >
          Like
        </button>
        <br></br>
        Author: {blog.author}
        <br></br>
        <button
          onClick={() => {
            removeBlog()
          }}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
