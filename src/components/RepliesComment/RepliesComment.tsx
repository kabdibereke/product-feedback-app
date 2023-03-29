import { IComments, IReplies } from '@/interface/interface'
import Image from 'next/image'
import React, { useState } from 'react'
import AddRepliesComment from '../AddRepliesComment/AddRepliesComment'
import styles from './Comment.module.scss'
type Props = {}

interface IComment {
    comment : IReplies,
    user: string
    lastIndex:number
    repIndex:number
    repliesUser: string
}

const RepliesComment = ({comment,user,lastIndex,repIndex,repliesUser}: IComment) => {
    const [open,setOpen]= useState(false)
  return (
   <>
    <div className={ styles.block}>
        <Image src={comment.user.image.substring(20)} alt={'image'} width={40} height={40} className={styles.image}/>
        <div className={styles.info}>
            <div className={styles.user_wrapper}>
                <div className={styles.user}>
                    <p className={styles.user_name}>{comment?.user.name}</p>
                    <p className={styles.user_email}>@{comment?.user.username}</p>
                </div>
                <div className={styles.reply} onClick={()=>setOpen(!open)}>Reply</div>
            </div>
            <p className={styles.text}>@{comment.replyingTo} {comment?.content}</p>
        </div>
       
    </div>
     {open && <AddRepliesComment  lastIndex={lastIndex} setOpen={setOpen} repIndex={repIndex} repliesUser={comment.user.username}/>}
   </>
  )
}

export default RepliesComment