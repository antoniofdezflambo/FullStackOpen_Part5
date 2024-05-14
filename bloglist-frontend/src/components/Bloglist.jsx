import Blog from './Blog'

const Bloglist = ({ user, blogs, logout }) => {
  return (
    <>
      <p>{user.name} logged-in</p> <button onClick={logout}> Logout </button>
      <h2> Blogs </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default Bloglist