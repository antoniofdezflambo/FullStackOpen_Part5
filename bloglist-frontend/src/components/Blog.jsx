import { useState } from 'react'
import Details from './Details'

const Blog = ({ blog, updateBlogs }) => {
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
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={toggleDetails}>{allDetails ? 'Hide' : 'View'}</button>
      {allDetails && <Details blog={blogDetails} updateBlog={updateBlog} />}
    </div>
  )
}

export default Blog