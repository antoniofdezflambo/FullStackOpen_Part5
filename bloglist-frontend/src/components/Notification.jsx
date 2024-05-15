const Notification = ({ successMessage, errorMessage }) => {
    if (errorMessage && errorMessage !== '') {
      return (
        <div className="error">
          {errorMessage}
        </div>
      )
    } else if (successMessage && successMessage !== '') {
      return (
        <div className="success">
          {successMessage}
        </div>
      )
    } else {
      return null
    }
}

export default Notification