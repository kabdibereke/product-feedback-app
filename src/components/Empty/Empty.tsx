import React from 'react'
import Image from 'next/image'
import emptyIcon from '../../assets/emptyIcon.svg'
import styles from './Empty.module.scss'
import Button from '../Button/Button'
import { useRouter } from 'next/router'
type Props = {}

const Empty = (props: Props) => {
    const router = useRouter()
  return (
    <div className={styles.block}>
        <Image  src={emptyIcon} alt='empty' width={130} height={136} />
        <div className={styles.text_wrapper}>
            <p className={styles.title}>There is no feedback yet.</p>
            <p className={styles.subtitle}>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
            <Button types='add' onClick={()=>router.push('/create-feedback')}> + Add Feedback</Button>
        </div>


    </div>
  )
}

export default Empty