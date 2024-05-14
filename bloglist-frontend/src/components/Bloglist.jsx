import Blog from './Blog'

const Bloglist = ({ user, blogs }) => {
  return (
    <>
      <p>{user.name} logged-in</p>
      <h2> Blogs </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default Bloglist