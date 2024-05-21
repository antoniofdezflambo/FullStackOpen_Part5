import { useEffect, useState } from 'react'
import Details from './Details'

const Blog = ({ blog }) => {
  const [allDetails, setAllDetails] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('View')

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

  useEffect(() => {
    (allDetails) ? setButtonLabel('Hide') : setButtonLabel('View')
  }, [allDetails])

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleDetails}>{buttonLabel}</button>
      {(allDetails) ? <Details blog={blog} /> : ''}
    </div>
  )
}

export default Blog