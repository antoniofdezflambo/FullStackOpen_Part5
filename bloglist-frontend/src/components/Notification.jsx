import PropTypes from 'prop-types'

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

Notification.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
}

export default Notification