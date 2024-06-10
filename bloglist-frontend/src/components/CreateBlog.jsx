import { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs, notifications, blogList, createBlogTest }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    if(createBlogTest) {
      createBlogTest(newBlog)
      return
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')

        blogList.toggleVisibility()

        notifications.setSuccessMessage('Blog added correctly')
        setTimeout(() => {
          notifications.setSuccessMessage('')
        }, 5000)
      }).catch(error => {
        notifications.setErrorMessage('Blog can not be added')
        setTimeout(() => {
          notifications.setErrorMessage('')
        }, 5000)
      })
  }

  return (
    <>
      <h3> Add Blog </h3>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            type="text"
            value={title}
            name="Title"
            placeholder='write title here'
            onChange={ ({ target }) => setTitle(target.value) }
          />
        </div>
        <div>
        author:
          <input
            type="text"
            value={author}
            name="Author"
            placeholder='write author here'
            onChange={ ({ target }) => setAuthor(target.value) }
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={url}
            name="Url"
            placeholder='write url here'
            onChange={ ({ target }) => setUrl(target.value) }
          />
        </div>
        <button type="submit">Create new blog</button>
      </form>
    </>
  )
}

CreateBlog.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
}

export default CreateBlog