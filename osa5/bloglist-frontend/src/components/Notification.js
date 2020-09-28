import React from 'react'
const ERROR = 'error'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.type === ERROR) {
    return <div className="error">{message.text}</div>
  } else {
    return <div className="success">{message.text}</div>
  }
}

export default Notification