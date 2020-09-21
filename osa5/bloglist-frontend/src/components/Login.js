import React from 'react'

const Login = (props) => {


  return (
      <div>
          <h2>Login</h2>
        <form onSubmit={props.login}>
            <label>Name:
                <input type="text" name="username" value={props.username} onChange={props.handleUsernameChange} ></input>
            </label>
            <br></br>
            <label>Password:
                <input type="password" name="password" value={props.password} onChange={props.handlePasswordChange}></input>
            </label>
            <br></br>
            <input type="submit" value="Submit"></input>
        </form>
      </div>
  )
}

export default Login