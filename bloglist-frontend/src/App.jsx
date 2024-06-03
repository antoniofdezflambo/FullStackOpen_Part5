import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [updateBlogs, setUpdateBlogs] = useState(false)

  const notifications = {successMessage, errorMessage, setSuccessMessage, setErrorMessage}

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    })
  }, [updateBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      setSuccessMessage(`${user.username} logged correctly`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } 
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setSuccessMessage(`${user.username} logged correctly`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)

    } catch (exception) {
      console.log('ERROR: ', exception)
      // TODO: mostrar errores
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')

    setSuccessMessage(`Logged out correctly`)
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }

  const changeUpdateBlogs = () => {
    setUpdateBlogs(!updateBlogs)
  }

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {
        (user === null) ?
          <LoginForm submit={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
          <Bloglist user={user} blogs={blogs} setBlogs={setBlogs} logout={handleLogout} notifications={notifications} updateBlogs={changeUpdateBlogs} />
      }
    </div>
  )
}

export default App