const Details = ({ blog }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button>Like</button></p>
      <p>{blog.author}</p>
    </div>
  )
}

export default Details