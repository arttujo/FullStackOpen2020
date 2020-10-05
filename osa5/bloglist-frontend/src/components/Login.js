import React,{ useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const ERROR = 'error'
const SUCCESS = 'success'


const Login = (props) => {

  const { setUser, messageHandler } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      messageHandler(`Logged in as: ${user.name}`, SUCCESS)
    } catch (e) {
      messageHandler(`${e.response.data.error}`, ERROR)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <br></br>
        <label>
          Password:
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </label>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}

Login.propTypes = {
  messageHandler: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default Login
