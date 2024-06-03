import PropTypes from 'prop-types'

const LoggedUser = ({ user, logout }) => {
  return (
    <>
      <p>{user.name} logged-in</p>
      <button onClick={logout}> Logout </button>
    </>
  )
}

LoggedUser.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default LoggedUser