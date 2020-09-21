import React, { useState, useEffect } from "react";

const BlogCreation = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {

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
          <input type="text" onChange={handleAuthorChange} value={author}></input>
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
  );
};

export default BlogCreation;
