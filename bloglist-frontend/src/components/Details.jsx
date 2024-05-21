import blogService from '../services/blogs'

const Details = ({ blog, updateBlog }) => {

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

  return (
    <div>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={like}>Like</button></p>
      <p>{blog.user.username}</p>
    </div>
  )
}

export default Details