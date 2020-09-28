import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogCreation from './components/BlogCreation'
import Toggleable from './components/Togglable'
import Notification from './components/Notification'
import './App.css'

const SUCCESS = 'success'
const ERROR = 'error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()
  const messageHandler = (text, type) => {
    setMessage({ text: text, type: type })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogout = () => {
    messageHandler('Logged out', SUCCESS)
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNewBlog = (newBlog) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      blogFormRef.current.toggleVisibility()
      blogService.createBlog(newBlog)
        .then((response) => {
          console.log(response)
          messageHandler(`Blog ${response.title} added!`, SUCCESS)
          refreshData()
        })
        .catch((e) => {
          console.log(e)
          messageHandler('error', ERROR)
        })
    } else {
      messageHandler('Error in login', ERROR)
    }
  }

  const likeBlog = (blog) => {
    blogService
      .likeBlog(blog)
      .then((response) => {
        console.log(response)
        blog.likes++
        messageHandler(`Liked: ${response.title}`, SUCCESS)
      })
      .catch((e) => {
        console.log(e)
        messageHandler(e, ERROR)
      })
  }

  const refreshData = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a,b) => {return b.likes - a.likes})))
  }

  useEffect(() => {
    refreshData()
    setMessage(null)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification message={message}></Notification>
        <Login setUser={setUser} messageHandler={messageHandler}></Login>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message}></Notification>
      <h2>Blogs</h2>
      <p>
        Logged in as {user.username} aka {user.name} <br></br>
        <button name="Logout" value="Logout" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogCreation
          createNewBlog = {createNewBlog}
        ></BlogCreation>
      </Toggleable>
      <br></br>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} messageHandler={messageHandler} refreshData={refreshData} likeBlog={likeBlog}/>
      ))}
    </div>
  )
}

export default App
