import React, { ForwardedRef } from 'react'
import conditionallyAddClassnames from '../../utils/concat-class-names'
import styles from './Input.module.css'
const Input = React.forwardRef(
  (
    props: React.InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        {...props}
        className={conditionallyAddClassnames(props.className, styles.input)}
      />
    )
  }
)
Input.displayName = 'Input'
export default Input
