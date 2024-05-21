import { useRef } from 'react'

import Blog from './Blog'
import CreateBlog from './CreateBlog'
import LoggedUser from './LoggedUser'
import Togglable from './Togglable'


const Bloglist = ({ user, blogs, setBlogs, logout, notifications }) => {
  const blogListRef = useRef()

  return (
    <>
      <LoggedUser user={user} logout={logout} />
      <h2> Blogs </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <Togglable buttonLabel='New blog' ref={blogListRef}>
        <CreateBlog user={user} blogs={blogs} setBlogs={setBlogs} notifications={notifications} blogList={blogListRef.current} />
      </Togglable>
    </>
  )
}

export default Bloglist