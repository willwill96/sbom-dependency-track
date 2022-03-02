import React from 'react'
import conditionallyAddClassnames from '../../utils/concat-class-names'
import styles from './IconButton.module.css'

const IconButton = (props: React.ButtonHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={conditionallyAddClassnames(
        props.className,
        styles['icon-button']
      )}
    >
      {props.children}
    </div>
  )
}

export default IconButton
