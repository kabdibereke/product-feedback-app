import React from 'react'
import { IMenu } from './Menu.props'
import styles from './Menu.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import check from '../../assets/check.svg'



const Menu = ({ arr,selected,setSelected, className,setOpen,...props}:IMenu) => {
  
  const handleSelected = (item:string)=> {
    setSelected(item)
    setOpen(false)
  }

  return (
    <div className={cn(styles.menu, className)}
    {...props} >
        <ul className={styles.lists}>
            {arr.map(item=> {
                return <li   key={item} onClick={()=>handleSelected(item)} >  {item} {item==selected ? <Image className={styles.check} src={check} alt='check' width={12} height={8}/>: ''} </li>
            })}
            
        </ul>
    </div>
  )
}

export default Menu