import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.css'

function Button({classes, icon, title = 'Button', onClick, disabled}) {
  const buttonClasses = classNames(classes, styles.button)

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {icon ? (<i className="material-icons right">{icon}</i>) : null}
    </button>
  )
}

export default Button
