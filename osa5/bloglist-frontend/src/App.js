import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import BlogCreation from "./components/BlogCreation";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./App.css";
const ERROR = "error";
const SUCCESS = "success";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const messageHandler = (text, type) => {
    setMessage({ text: text, type: type });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      messageHandler(`Logged in as: ${user.name}`, SUCCESS);
    } catch (e) {
      messageHandler(`${e.response.data.error}`, ERROR)
    }
  };

  const handleLogout = () => {
    messageHandler("Logged out", SUCCESS);
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const refreshData = () =>{
    blogService.getAll().then((blogs) => setBlogs(blogs));

  }

  useEffect(() => {
    refreshData()
    setMessage(null);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <Notification message={message}></Notification>
        <Login
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          username={username}
          password={password}
          login={handleLogin}
        ></Login>
      </div>
    );
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
      <BlogCreation messageHandler={messageHandler} refresh={refreshData}></BlogCreation>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
