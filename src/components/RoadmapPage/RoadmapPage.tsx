import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './RoadmapPage.module.scss'
import Image from 'next/image'
import arrowBack from '../../assets/arrowBack.svg'
import { useRouter } from 'next/router'
import Button from '../Button/Button'
import RoadmapItem from '../RoadmapItem/RoadmapItem'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/intex'
import { IProductRequests } from '@/interface/interface'
import { onValue, ref } from 'firebase/database'
import { db } from '../../../firebase'
type Props = {}

const RoadmapPage = (props: Props) => {
    const {asPath} = useRouter()
    const {requestList} = useSelector((item:RootState)=>item.sortList)
    const [allList,setAllList] =useState<IProductRequests[]>([])
   
    useEffect(()=> {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val()
            if (data !== null) {
              
                setAllList(Object.values(data))
              
            }
          });
      },[requestList])

    
  return (
    <div className={styles.block}>
        <div className={styles.header}>
            <div className={styles.title_wrapper}>
                <Link className={styles.go_back_button} href={`/`}>
                    <Image className={styles.arrowBlue} src={arrowBack} alt="arrowBack" width={15} height={12}/>
                    <p className={styles.go_back}>Go Back</p>
                </Link>
                <p className={styles.title}>Roadmap</p>
            </div>
            <Button types='add'>+ Add Feedback</Button>
        </div>
        <div className={styles.todo_wrapper}>
            <div className={styles.doing}>
                <div className={styles.text}>
                    <p className={styles.title}>Planned</p>
                    <p className={styles.subtitle}>Ideas prioritized for research</p>
                </div>
                {allList?.map((item,index)=> {
                    if(item.status=='planned') {
                        return <RoadmapItem key={index} item={item} color={'planned'}/>
                    }
                })}
            </div>
            <div className={styles.doing}>
                <div className={styles.text}>
                    <p className={styles.title}>In-Progress</p>
                    <p className={styles.subtitle}>Currently being developed</p>
                </div>
                {allList?.map((item,index)=> {
                    if(item.status=='in-progress') {
                        return <RoadmapItem key={index} item={item}  color={'inProgress'}/>
                    }
                })}
            </div>
            <div className={styles.doing}>
                <div className={styles.text}>
                    <p className={styles.title}>Live</p>
                    <p className={styles.subtitle}>Released features</p>
                </div>
                {allList?.map((item,index)=> {
                    if(item.status=='live') {
                        return <RoadmapItem key={index} item={item} color={'live'}/>
                    }
                })}
            </div>
        </div>
    </div>
  )
}

export default RoadmapPage