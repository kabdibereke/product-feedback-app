import { IComments, IReplies } from '@/interface/interface'
import Image from 'next/image'
import React from 'react'
import styles from './Comment.module.scss'
type Props = {}

interface IComment {
    comment : IReplies,
    user: string
}

const RepliesComment = ({comment,user}: IComment) => {
  return (
    <div className={ styles.block}>
        <Image src={comment.user.image.substring(20)} alt={'image'} width={40} height={40} className={styles.image}/>
        <div className={styles.info}>
            <div className={styles.user_wrapper}>
                <div className={styles.user}>
                    <p className={styles.user_name}>{comment?.user.name}</p>
                    <p className={styles.user_email}>@{comment?.user.username}</p>
                </div>
                <div className={styles.reply}>Reply</div>
            </div>
            <p className={styles.text}>@{user} {comment?.content}</p>
        </div>
    </div>
  )
}

export default RepliesComment