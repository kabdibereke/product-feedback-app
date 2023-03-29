import React, { useEffect, useState } from 'react'
import Menu from '../Menu/Menu'

import arrowBack from '../../assets/arrowBack.svg'
import arrowBlue from '../../assets/arrowBlue.svg'
import arrowBlueDown from '../../assets/arrowBlueDown.svg'
import styles from './CreateFeedback.module.scss'
import Image from 'next/image'
import Button from '../Button/Button'
import edit from '../../assets/edit.svg'
import { IProductRequests } from '@/interface/interface'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from '../../../firebase'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/intex'
type Props = {}
const arr =['All', 'UI','UX','Enhancement', 'Bug', 'Feature']
const arr2 =['Suggestion', 'Planned','In-Progress','Live']
const EditFeedback = (props: Props) => {
    const { asPath } = useRouter()
    const [selected, setSelected] = useState('')
    const [status, setStatus] = useState('')
    const [open, setOpen] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)
    const [title, setTitle] =useState('')
    const [descr, setDescr] = useState('')
    const [titleError, setTitleError]= useState(false)
    const [descrError, setDescrError]= useState(false)
    const router=useRouter()
    const [loading, setLoading]= useState(false)
    const {requestList} = useSelector((item:RootState)=>item.sortList)
 
    
    useEffect(()=> {
        requestList.forEach((item,index)=> {
            if(item.id==+asPath.substring(6)) {
               
                console.log(index)
                setTitle(item.title)
                setSelected(item.category.substring(0,1).toUpperCase()+item.category.substring(1))
                setStatus(item.status.substring(0,1).toUpperCase()+item.status.substring(1))
                setDescr(item.description)
            }
        })  
    },[asPath,requestList])

    const handleOpen =(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.stopPropagation()
        setOpen(!open)
    }
    const handleOpenStatus =(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {
        e.stopPropagation()
        setOpenStatus(!openStatus)
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
               await update(ref(db, `${asPath.substring(6)}`), {
                    category: selected,
                    title:title,
                    status:status.toLowerCase(),
                    description: descr
                });
                setLoading(false)
                setTitle('')
                setDescr('')
                toast.success('Success', {
                    autoClose:1000
                })
                router.push(`/${asPath.substring(6)}`)
            } catch (error) {
                toast.error('Somthing else wrong... try later', {
                    autoClose:1000
                })
            }
        }
    }

    const handleDelete=async()=> {
       await remove(ref(db, `${asPath.substring(6)}`));
      
       router.push(`/`)
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
        <Link className={styles.go_back_button} href={`/${asPath.substring(6)}`}>
            <Image className={styles.arrowBlue} src={arrowBack} alt="arrowBack" width={15} height={12}/>
            <p className={styles.go_back}>Go Back</p>
        </Link>
        <Image className={styles.image} src={edit} alt="edit" width={56} height={56}/>

        <p className={styles.title}>
        Editing - {title} 
        </p>
        <div className={styles.inputs_wrapper}>
            <p className={styles.input_title}>Feedback Title</p>
            <p className={styles.input_subtitle}>Add a short, descriptive headline</p>
            <input type="text" value={title} className={!titleError? styles.input: styles.input_error} onChange={handleTitle} />
            <p className={!titleError? styles.none: styles.error}>Cant be empty</p>
        </div>
        <div className={styles.inputs_wrapper}>
            <p className={styles.input_title}>Category</p>
            <p className={styles.input_subtitle}>Choose a category for your feedback</p>
            <div className={open? styles.active :styles.select} onClick={handleOpen}>
                <p >{selected}</p>
                <Image className={styles.arrow} src={open? arrowBlueDown: arrowBlue} alt='arrow' width={12} height={8} onClick={handleOpen}/>
                <Menu arr={arr} setSelected={setSelected} selected={selected} setOpen={setOpen} className={open? styles.menu :styles.close}/>
            </div>
        </div>
        <div className={styles.inputs_wrapper}>
            <p className={styles.input_title}>Update Status</p>
            <p className={styles.input_subtitle}>Change feature state</p>
            <div className={openStatus? styles.active :styles.select} onClick={handleOpenStatus}>
                <p >{status}</p>
                <Image className={styles.arrow} src={openStatus? arrowBlueDown: arrowBlue} alt='arrow' width={12} height={8} onClick={handleOpenStatus}/>
                <Menu arr={arr2} setSelected={setStatus} selected={status} setOpen={setOpenStatus} className={openStatus? styles.menu :styles.close}/>
            </div>
        </div>
        <div className={styles.inputs_wrapper}>
            <p className={styles.input_title}>Feedback Detail</p>
            <p className={styles.input_subtitle}>Include any specific comments on what should be improved, added, etc.</p>
            <textarea value={descr} className={!descrError? styles.textarea: styles.textarea_error} onChange={handleDescr} />
            <p className={!descrError? styles.none: styles.error}>Cant be empty</p>
        </div>
        <div  className={styles.buttons}>
            <Button types='delete' onClick={handleDelete}>Delete</Button>
            <Button types='cancel' onClick={()=>router.push(`/${asPath.substring(6)}`)}>Cancel</Button>
            <Button onClick={handleSubmit}  types='add' >{loading? 'Loading' :'Edit Feedback'}</Button>
            
        </div>

    </div>
    <ToastContainer/>
    </>
  )
}

export default EditFeedback