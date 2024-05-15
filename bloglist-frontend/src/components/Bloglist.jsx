import Blog from './Blog'
import CreateBlog from './CreateBlog'
import LoggedUser from './LoggedUser'

const Bloglist = ({ user, blogs, setBlogs, logout, notifications }) => {
  return (
    <>
      <LoggedUser user={user} logout={logout} />
      <h2> Blogs </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <CreateBlog user={user} blogs={blogs} setBlogs={setBlogs} notifications={notifications} />
    </>
  )
}

export default Bloglist