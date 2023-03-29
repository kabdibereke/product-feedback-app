import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import logo from '../../assets/logo.svg'
import arrow from '../../assets/arrow.svg'
import arrowDown from '../../assets/arrowDown.svg'
import Button from '../Button/Button'
import Menu from '../Menu/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/intex'
import { IProductRequests } from '@/interface/interface'
import { sortEdit } from '@/store/slice/sortSlice'
import { useRouter } from 'next/router'

interface INavbar {
    suggestList: IProductRequests[]
}
const arr =['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments']
const Navbar = ({suggestList}:INavbar) => {
    const router =useRouter()
    const [selected, setSelected] =useState('Most Upvotes')
    const [open, setOpen]=useState(false)
    const {filterResult,sortResult} = useSelector((item:RootState)=>item.sortList)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=> {
        dispatch(sortEdit(selected))
    },[selected])
    useEffect(()=> {
        document.addEventListener('click', ()=> {
            setOpen(false)
        })
        return (
            document.removeEventListener('click', ()=> {
                setOpen(false)
            })
        )
    },[])

    const handleOpen =(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.stopPropagation()
        setOpen(!open)
    }
  return (
    <div className={styles.wrapper}>
        <div className={styles.logo_wrapper}>
            <Image src={logo} alt='logo' width={24} height={24} className={styles.img}/>
            <p className={styles.title}>{suggestList.length} Suggestions</p>
            <div className={styles.sort_wrapper}  >
                <p className={styles.sort}>Sort by : </p>
                <p className={styles.option} onClick={handleOpen}>{sortResult}</p>
                <Image className={styles.arrow} src={open? arrowDown: arrow} alt='arrow' width={12} height={8} onClick={handleOpen}/>
            </div>
        </div>
        <Button types='add' onClick={()=>router.push('/create-feedback')}> + Add Feedback</Button>
        <Menu arr={arr} setSelected={setSelected} selected={selected} setOpen={setOpen} className={open? styles.menu :styles.close}/>
    </div>
  )
}

export default Navbar