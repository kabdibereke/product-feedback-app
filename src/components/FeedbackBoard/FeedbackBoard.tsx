import React, { useState } from 'react'
import Roadmap from '../Roadmap/Roadmap'
import Sidebar from '../Sidebar/Sidebar'
import TabsBlock from '../TabsBlock/TabsBlock'
import styles from './FeedbackBoard.module.scss'

const FeedbackBoard = () => {
  const [active,setActive]=useState(false)
  return (
    <div className={styles.block}>
        <h1 className={styles.title}>Frontend Mentor</h1>
        <p className={styles.subtitle}> Feedback Board</p>
        <div className={active? styles.active: styles.burger} onClick={()=>setActive(!active)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={active?styles.active_sidebar:styles.sidebar}>
          <TabsBlock/>
          <Roadmap/>
        </div>
    </div>
  )
}

export default FeedbackBoard