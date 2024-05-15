const LoggedUser = ({ user, logout }) => {
  return (
    <>
    <p>{user.name} logged-in</p>
    <button onClick={logout}> Logout </button>
    </>
  )
}

export default LoggedUser