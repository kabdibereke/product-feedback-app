import React from 'react'
import styles from './Button.module.scss'
import {IButton} from './Button.props'
import cn from 'classnames';
const Button = ({children, types, className, ...props}:IButton) => {
  return (
    <button className={cn(styles.button, className, {
        [styles.edit]: types == 'edit',
        [styles.delete]: types == 'delete',
        [styles.cancel]: types == 'cancel',
    })}
    {...props}>{children}</button>
  )
}

export default Button