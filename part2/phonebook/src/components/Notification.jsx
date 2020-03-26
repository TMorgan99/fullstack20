
import React from 'react'

const Notification = ({message}) => {

  const warningStyle = {
    color: 'grey',
    background: 'lightblue',
    fontSize: 16,
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 10,
    marginBottom: 8,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightyellow',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={message.isError ? errorStyle : warningStyle}> 
      {message.text}
    </div>
  )
}

export default Notification
