import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const [blogData, setBlogData] = useState(blog)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    handleLike(blogData)
    const updatedBlogData = { ...blogData, likes: blogData.likes + 1 }
    setBlogData(updatedBlogData)
  }

  const deleteBlog = () => {
    handleDelete(blogData)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="header">
        {blogData.title} {blogData.author}
        <button onClick={() => toggleVisibility()}>view</button>
      </div>
      <div style={showWhenVisible} className="content">
        <p>{blogData.title} {blogData.author}
          <button onClick={() => toggleVisibility()}>hide</button>
        </p>
        <p>{blogData.url}</p>
        <p>{blogData.likes}
          <button onClick={() => like()}>like</button>
        </p>
        <button id='delete-blog' onClick={() => deleteBlog()}>delete</button>
      </div>
    </div>
  )}

export default Blog
