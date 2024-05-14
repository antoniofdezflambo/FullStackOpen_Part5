import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import Bloglist from './components/Bloglist'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log('ERROR: ', exception)
      // TODO: mostrar errores
    }
  }

  return (
    <div>
      {
        (user === null) ?
          <LoginForm submit={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
          <Bloglist user={user} blogs={blogs} />
      }
    </div>
  )
}

export default App