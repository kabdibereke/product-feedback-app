import { IProductRequests } from '@/interface/interface'
import React from 'react'
import RatingButton from '../RatingButton/RatingButton'
import styles from './RoadmapItem.module.scss'
import comment from '../../assets/comment.svg'
import Image from 'next/image'
import { ref, update } from 'firebase/database'
import { db } from '../../../firebase'
import Link from 'next/link'
import { IRoadmap } from './RoadmapItem.props'
import cn from 'classnames'

const RoadmapItem = ({item,color,className, ...props}: IRoadmap) => {

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
    <div className={cn(styles.block, className, {
        [styles.planned]: color == 'planned',
        [styles.live]: color == 'live',
        [styles.inProgress]: color == 'inProgress'
    })}
    {...props}>
        <div className={styles.name_wrapper}>
            <span></span>
            {color=='planned' && <p className={styles.name}>Planned</p>}
            {color=='live' && <p className={styles.name}>Live</p>}
            {color=='inProgress' && <p className={styles.name}>In-Progress</p>}
        </div>
        <Link  className={styles.text} href={`/${item.id}`}>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.subtitle}>{item.description}</p>
            <div className={styles.tag}>
                {item.status.substring(0,1).toUpperCase()+item.status.substring(1)}
            </div>
        </Link>
        <div className={styles.rating}>
            <RatingButton upvote={upvote} upvoted={item.upvoted}>{item.upvotes}</RatingButton>
            <div className={styles.comments}>
                <Image src={comment} alt='comment' width={18}  height={16}/>
                 <p className={styles.count}>{item.comments? item.comments.length: 0}</p>
            </div>
        </div>
    </div>
  )
}

export default RoadmapItem