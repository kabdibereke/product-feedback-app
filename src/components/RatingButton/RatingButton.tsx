import Image from 'next/image'
import React from 'react'
import arrowRate from '../../assets/arrowRate.svg'
import arrowDown from '../../assets/arrowDown.svg'
import styles from './RatingButton.module.scss'
import { IRatingButton } from './RatingButton.prop'

const RatingButton = ({upvote,children,upvoted,...props}:IRatingButton) => {
  return (
    <div className={!upvoted ? styles.block: styles.active} onClick={upvote}>
       <Image src={!upvoted ? arrowRate: arrowDown} alt='rate' width={12} height={8}/>
        <p className={styles.count}>{children}</p>
    </div>
  )
}

export default RatingButton