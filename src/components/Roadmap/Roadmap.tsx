import { IProductRequests } from '@/interface/interface';
import { RootState } from '@/store/intex';
import { onValue, ref } from 'firebase/database';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../../firebase';
import styles from './Roadmap.module.scss'


const Roadmap = () => {
    const {filterResult,sortResult,requestList} = useSelector((item:RootState)=>item.sortList)
    const [roadmapList, setRoadmapList] = useState<any[]>([])
   
    useEffect(()=> {
        let live=[]
        let inProgress=[]
        let planned =[]
        requestList.forEach(item=> {
            if(item.status=='live') {
                live.push(item.status)
            }
            if(item.status=='in-progress') {
                inProgress.push(item.status)
            }
            if(item.status=='planned') {
                planned.push(item.status)
            }
        })
        setRoadmapList([
            {
                status :'Live',
                count:live.length
            },
            {
                status :'In-progress',
                count:inProgress.length
            },
            {
                status :'Planned',
                count:planned.length
            }
        ])
    },[requestList])
  return (
    <div className={styles.block}>
        <div className={styles.title_wrapper}>
            <p className={styles.title}>Roadmap</p>
           <Link className={styles.link} href={'/roadmap'}>View</Link>
        </div>
        <div className={styles.subtitle_wrapper}>
            {roadmapList.map((item,index)=> {
                return  (
                    <div key={index} className={styles.text_wrapper}>
                    <p className={styles.subtitle}>{item.status}</p>
                    <p className={styles.count}>{item.count}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Roadmap