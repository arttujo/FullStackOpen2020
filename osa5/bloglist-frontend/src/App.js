import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import BlogCreation from "./components/BlogCreation"
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      blogService.setToken(user.token)
      setUsername("");
      setPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      <Login
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        username={username}
        password={password}
        login={handleLogin}
      ></Login>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        Logged in as {user.username} aka {user.name} <br></br>
        <button name="Logout" value="Logout" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <BlogCreation></BlogCreation>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
