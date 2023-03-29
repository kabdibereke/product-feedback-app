import React, { useEffect, useState } from 'react'
import Menu from '../Menu/Menu'

import arrowBack from '../../assets/arrowBack.svg'
import arrowBlue from '../../assets/arrowBlue.svg'
import arrowBlueDown from '../../assets/arrowBlueDown.svg'
import styles from './CreateFeedback.module.scss'
import Image from 'next/image'
import Button from '../Button/Button'
import plus from '../../assets/plus.svg'
import { IProductRequests } from '@/interface/interface'
import { onValue, ref, set } from 'firebase/database'
import { db } from '../../../firebase'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Link from 'next/link'
type Props = {}
const arr =['All', 'UI','UX','Enhancement', 'Bug', 'Feature']
const CreateFeedback = (props: Props) => {
    const {asPath} = useRouter()
    const [selected, setSelected] = useState('Feature')
    const [open, setOpen] = useState(false)
    const [title, setTitle] =useState('')
    const [descr, setDescr] = useState('')
    const [titleError, setTitleError]= useState(false)
    const [descrError, setDescrError]= useState(false)
    const [loading, setLoading]= useState(false)
    const handleOpen =(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.stopPropagation()
        setOpen(!open)
    }
    const handleSubmit =async()=> {
        if(!title) {
            setTitleError(true)
        }
        if(!descr) {
            setDescrError(true)
        }

        if(descr && title) {
            setLoading(true)
            let id= new Date().getTime()
            try {
                await set(ref(db, id.toString()), {
                    category: selected,
                    description: descr,
                    id: id,
                    status: 'suggestion',
                    title: title,
                    upvotes: 0,
                });
                setLoading(false)
                setTitle('')
                setDescr('')
                toast.success('Success', {
                    autoClose:1000
                })
            } catch (error) {
                toast.error('Somthing else wrong... try later', {
                    autoClose:1000
                })
            }
        }
    }

    const handleTitle=(e: React.ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.target.value)
        setTitleError(false)
    }

    const handleDescr=(e: React.ChangeEvent<HTMLTextAreaElement>)=> {
        setDescr(e.target.value)
        setDescrError(false)
    }
    
  return (
    <>
    <div className={styles.wrapper}>
        <Link className={styles.go_back_button} href={"/"}>
            <Image className={styles.arrowBlue} src={arrowBack} alt="arrowBack" width={15} height={12}/>
            <p className={styles.go_back}>Go Back</p>
        </Link>
        <Image className={styles.image} src={plus} alt="plus" width={56} height={56}/>

        <p className={styles.title}>
            Create New Feedback
        </p>
        <div className={styles.inputs_wrapper}>
            <p className={styles.input_title}>Feedback Title</p>
            <p className={styles.input_subtitle}>Add a short, descriptive headline</p>
            <input type="text" value={title} className={!titleError? styles.input: styles.input_error} onChange={handleTitle} />
            <p className={!titleError? styles.none: styles.error}>Cant be empty</p>
        </div>
        <div className={styles.inputs_wrapper}>
            <p className={styles.input_title}>Feedback Title</p>
            <p className={styles.input_subtitle}>Add a short, descriptive headline</p>
            <div className={open? styles.active :styles.select} onClick={handleOpen}>
                <p >{selected}</p>
                <Image className={styles.arrow} src={open? arrowBlueDown: arrowBlue} alt='arrow' width={12} height={8} onClick={handleOpen}/>
                <Menu arr={arr} setSelected={setSelected} selected={selected} setOpen={setOpen} className={open? styles.menu :styles.close}/>
            </div>
        </div>
        <div className={styles.inputs_wrapper}>
            <p className={styles.input_title}>Feedback Title</p>
            <p className={styles.input_subtitle}>Add a short, descriptive headline</p>
            <textarea value={descr} className={!descrError? styles.textarea: styles.textarea_error} onChange={handleDescr} />
            <p className={!descrError? styles.none: styles.error}>Cant be empty</p>
        </div>
        <div  className={styles.buttons}>
            <Button types='cancel'>Cancel</Button>
            <Button onClick={handleSubmit}  types='add'>{loading? 'Loading' :'Add Feedback'}</Button>
        </div>

    </div>
    <ToastContainer/>
    </>
  )
}

export default CreateFeedback