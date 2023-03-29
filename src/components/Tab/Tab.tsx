import React from 'react'
import styles from './Tab.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/intex'
import { ITab } from './Tab.props'



const Tab = ({item, ...props}:ITab) => {
  const {filterResult,sortResult} = useSelector((item:RootState)=>item.sortList)
  
  return (
    <div className={item!=filterResult? styles.wrapper : styles.active} {...props}>
      <p className={ styles.title}>{item}</p>
    </div>
  )
}

export default Tab