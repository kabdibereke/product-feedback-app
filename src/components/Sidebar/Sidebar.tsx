import React from 'react'
import FeedbackBoard from '../FeedbackBoard/FeedbackBoard'
import Roadmap from '../Roadmap/Roadmap'
import TabsBlock from '../TabsBlock/TabsBlock'
import styles from './Sidebar.module.scss'
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <FeedbackBoard/>
        <TabsBlock/>
        <Roadmap/>
    </div>
  )
}

export default Sidebar