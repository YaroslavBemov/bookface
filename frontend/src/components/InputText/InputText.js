import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import styles from './InputText.module.css'

function InputText({classes, value, onChange, onKeyPress}) {
  const inputTextClasses = classNames(classes, styles.input)
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <input
      className={inputTextClasses}
      type="text"
      ref={inputRef}
      value={value}
      placeholder='Message'
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  )
}

export default InputText
