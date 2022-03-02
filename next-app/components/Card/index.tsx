import React from 'react'
import conditionallyAddClassnames from '../../utils/concat-class-names'
import styles from './Card.module.css'

const Card = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={conditionallyAddClassnames(props.className, styles.card)}
    >
      {props.children}
    </div>
  )
}

export default Card
