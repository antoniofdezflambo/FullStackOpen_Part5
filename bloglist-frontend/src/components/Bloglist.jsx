import { useRef } from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'
import CreateBlog from './CreateBlog'
import LoggedUser from './LoggedUser'
import Togglable from './Togglable'


const Bloglist = ({ user, blogs, setBlogs, logout, notifications, updateBlogs }) => {
  const blogListRef = useRef()

  return (
    <>
      <LoggedUser user={user} logout={logout} />
      <h2> Blogs </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} notifications={notifications} />
      )}
      <Togglable buttonLabel='New blog' ref={blogListRef}>
        <CreateBlog user={user} blogs={blogs} setBlogs={setBlogs} notifications={notifications} blogList={blogListRef} />
      </Togglable>
    </>
  )
}

Bloglist.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired
}

export default Bloglist