import Image from 'next/image'
import React, { useEffect } from 'react'
import RatingButton from '../RatingButton/RatingButton'
import styles from './Feedback.module.scss'
import comment from '../../assets/comment.svg'
import { IProductRequests } from '@/interface/interface'
import { IFeedback } from './Feedback.props'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { onValue, ref, update } from 'firebase/database'
import { db } from '../../../firebase'



const Feedback = ({item,click,...props}:IFeedback) => {
  const router= useRouter()
  
  let   upvote =()=> {
    let count = item.upvotes
    if(!item.upvoted) {
      count=count+1
    }else {
      count=count-1
    }
    update(ref(db,`${item.id}`), {
      upvoted: !item.upvoted,
      upvotes:count
    });
    console.log('das')
  }
  return (
    <div className={styles.block} >
       <div className={styles.rating}>
            <RatingButton upvote={upvote} upvoted={item.upvoted}>{item.upvotes}</RatingButton>
            {click? <Link className={styles.wrapper} href={`/${item.id}`}>
                <p className={styles.title}>
                {item.title}
                </p>
                <p className={styles.subtitle}>
                {item.description}
                </p>
                <div className={styles.tag}>
                {item.category  }
                </div>
            </Link>: <div className={styles.wrapper} >
                <p className={styles.title}>
                {item.title}
                </p>
                <p className={styles.subtitle}>
                {item.description}
                </p>
                <div className={styles.tag}>
                {item.category  }
                </div>
            </div>}
       </div>
        <div className={styles.comments}>
            <Image src={comment} alt='comment' width={18}  height={16}/>
            <p className={styles.count}>{item.comments? item.comments.length: 0}</p>
        </div>
    </div>
  )
}

export default Feedback