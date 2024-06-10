import { useState } from 'react'
import Details from './Details'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogs, notifications, onLikeTest }) => {
  const [allDetails, setAllDetails] = useState(false)
  const [blogDetails, setBlogDetails] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setAllDetails(!allDetails)
  }

  const updateBlog = updatedBlog => {
    setBlogDetails(updatedBlog)
    updateBlogs()
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} - {blog.author} <button onClick={toggleDetails}>{allDetails ? 'Hide' : 'View'}</button>
      {allDetails && <Details blog={blogDetails} updateBlog={updateBlog} updateBlogs={updateBlogs} notifications={notifications} onLikeTest={onLikeTest} />}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
}

export default Blog