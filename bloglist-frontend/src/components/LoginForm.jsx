import PropTypes from 'prop-types'

const LoginForm = ({ submit, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={submit}>
      <div>
        Username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
        Password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button type="submit"> Login </button>
    </form>
  )
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm