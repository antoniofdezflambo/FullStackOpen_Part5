import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const Details = ({ blog, updateBlog, updateBlogs, notifications }) => {

  const like = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    }

    await blogService
      .update(blog.id, updatedBlog)
      .then(updatedBlog => {
        updateBlog(updatedBlog)
      })
  }

  const remove = async (event) => {
    event.preventDefault()

    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      await blogService
        .remove(blog.id)
        .then( () => {
          updateBlogs()
          notifications.setSuccessMessage('Blog deleted correctly')
        })
        .catch( () => notifications.setErrorMessage('Error: Cannot remove blog') )
    }
  }

  return (
    <div>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={like}>Like</button></p>
      <p>{blog.user.username}</p>
      <button onClick={remove}>Remove</button>
    </div>
  )
}

Details.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
}

export default Details