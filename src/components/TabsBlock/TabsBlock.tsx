import React from 'react'
import Tab from '../Tab/Tab'
import styles from './TabsBlock.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch,RootState } from '@/store/intex'
import { filterEdit } from '@/store/slice/sortSlice'
const arr =['All', 'UI','UX','Enhancement', 'Bug', 'Feature']
const TabsBlock = () => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className={styles.block}>
      {arr.map((item,index)=> {
        return  <Tab key={index} item={item} onClick={()=>dispatch(filterEdit(item))}/>
      })}

    </div>
  )
}

export default TabsBlock