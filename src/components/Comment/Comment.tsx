import { IComments, IReplies } from '@/interface/interface'
import { RootState } from '@/store/intex'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddRepliesComment from '../AddRepliesComment/AddRepliesComment'
import RepliesComment from '../RepliesComment/RepliesComment'
import styles from './Comment.module.scss'
type Props = {}

interface IComment {
    comment :IComments 
    
}

const Comment = ({comment}: IComment) => {
    const [open,setOpen]= useState(false)
    const {requestList} = useSelector((item:RootState)=>item.sortList)
    const { asPath } = useRouter()
    const [commentList,setCommentList]= useState<IComments[]>([])
    const [replies, setReplies]= useState<IReplies[]>([])
    const [lastIndex, setLastIndex]=useState(0)
    const [repIndex, setRepIndex]= useState(0)
    const [repliesUser, setRepliesUser]= useState('')

    useEffect(()=> {
        requestList.forEach((item,index)=> {
            if(item.id==+asPath.substring(1)) {
                
                if(item.comments) {
                   item.comments.forEach((item,index)=> {
                    if(item.id==comment.id)  {
                        setRepliesUser(item.user.username)
                        setLastIndex(index)
                        if(item.replies) {
                            setRepIndex(item.replies.length)
                        }
                    }
                   })
                }
                
                
            }
        })
    },[asPath,requestList]) 
    
  return (
    <div className={styles.wrapper}>
        <div className={ styles.block}>
        <Image src={comment.user.image.substring(20)} alt={'image'} width={40} height={40} className={styles.image}/>
        <div className={styles.info}>
            <div className={styles.user_wrapper}>
                <div className={styles.user}>
                    <p className={styles.user_name}>{comment?.user.name}</p>
                    <p className={styles.user_email}>@{comment?.user.username}</p>
                </div>
                <div className={styles.reply} onClick={()=>setOpen(!open)}>{!open? 'Reply': 'Close'}</div>
            </div>
            <p className={styles.text}>{comment?.content}</p>
        </div>
        
    </div>
    {comment.replies?.map((item,index)=> {
        return <RepliesComment key={index} comment={item} user={comment.user.username}/>
    })}
    {open && <AddRepliesComment  lastIndex={lastIndex} setOpen={setOpen} repIndex={repIndex} repliesUser={repliesUser}/>}
    </div>
  )
}

export default Comment