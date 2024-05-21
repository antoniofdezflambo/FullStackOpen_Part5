import { useState, useRef } from 'react'
import Details from './Details'

const Blog = ({ blog }) => {
  const [allDetails, setAllDetails] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('View')

  const blogRef = useRef()

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

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={toggleDetails}>{allDetails ? 'Hide' : 'View'}</button>
      {(allDetails) ? <Details blog={blog} ref={blogRef} /> : ''}
    </div>
  )
}

export default Blog