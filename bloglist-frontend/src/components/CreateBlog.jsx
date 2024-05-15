import { useState } from "react"
import blogService from '../services/blogs'

const CreateBlog = ({ blogs, setBlogs }) => {
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

    blogService
    .create(newBlog)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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
            onChange={ ({ target }) => setTitle(target.value) }
          />
      </div>
      <div>
        author:
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={ ({ target }) => setAuthor(target.value) }
          />
      </div>
      <div>
        url:
          <input 
            type="text"
            value={url}
            name="Url"
            onChange={ ({ target }) => setUrl(target.value) }
          />
      </div>
      <button type="submit"> Create new blog </button>
    </form>
    </>
  )
}

export default CreateBlog