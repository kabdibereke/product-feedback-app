import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './CommentsPage.module.scss'
import arrowBack from '../../assets/arrowBack.svg'
import Button from '../Button/Button'
import Feedback from '../Feedback/Feedback'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/intex'
import { IComments, IProductRequests, IReplies } from '@/interface/interface'
import { useRouter } from 'next/router'
import { onValue, ref } from 'firebase/database'
import { db } from '../../../firebase'
import { addList } from '@/store/slice/sortSlice'
import Comment from '../Comment/Comment'
import AddComment from '../AddComment/AddComment'
type Props = {}

const CommentsPage = (props: Props) => {
    const {requestList} = useSelector((item:RootState)=>item.sortList)
    const { asPath } = useRouter()
    const [commentList,setCommentList]= useState<IComments[]>([])
    const [replies, setReplies]= useState<IReplies[]>([])
    const [lastIndex, setLastIndex]=useState(0)
    useEffect(()=> {
        requestList.forEach((item,index)=> {
            if(item.id==+asPath.substring(1)) {
               
                if(item.comments) {
                    setCommentList(item.comments)
                    setLastIndex(item.comments.length)
                }
                
                
            }
        })
    },[asPath,requestList]) 


  return (
    <div className={styles.block}>
          <div className={styles.buttons}>
            <Link className={styles.go_back_button} href={"/"}>
              <Image className={styles.arrowBlue} src={arrowBack} alt="arrowBack" width={15} height={12}/>
              <p className={styles.go_back}>Go Back</p>
            </Link>
            <Button types='edit'><Link className={styles.link} href={`/edit${asPath}`}>Edit Feedback</Link></Button>
          </div>
            {requestList.map((item,index)=> {
            if(item.id==+asPath.substring(1)) {
                return <Feedback key={index} item={item}  click={false}/>
            }
            })}
          <div className={styles.comment_wrapper}>
            <p className={styles.title}>4 Comments</p>
            {commentList.map((item,index)=> {
                  return <Comment key={index} comment={item} />
            })}
          
          </div>
          <AddComment  lastIndex={lastIndex}/>
    </div>
  )
}

export default CommentsPage