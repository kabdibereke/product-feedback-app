import React from 'react'
import FeedbackBoard from '../FeedbackBoard/FeedbackBoard'
import styles from './Header.module.scss'
type Props = {}

const Header = (props: Props) => {
  return (
    <div className={styles.board}>
        <FeedbackBoard/>
    </div>
  )
}

export default Header