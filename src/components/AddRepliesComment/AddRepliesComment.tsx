import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import { db } from '../../../firebase'
import Button from '../Button/Button'
import styles from './AddComment.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
interface IAddComment {

    lastIndex:number
    repIndex:number
    repliesUser: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddRepliesComment = ({lastIndex,repIndex,repliesUser,setOpen}:IAddComment) => {
    const [text,setText] =useState('')
    const [textError, setTextError]= useState(false)
    const [loading,setLoading]=useState(false)
    const {asPath} =useRouter()
    const handleSubmit =async()=> {
        if(!text) {
            setTextError(true)
        }
        
        if(text) {
            setLoading(true)
            
            let id= new Date().getTime()
            try {
                await set(ref(db, `${asPath}`+'/comments'+"/"+lastIndex+"/replies"+"/"+repIndex), {
                    content:text,
                    replyingTo: repliesUser,
                    user: {
                        image:"./assets/user-images/image-victoria.jpg",
                        name:"Victoria Mejia",
                        username:"arlen_the_marlin"

                    }
                    
                });
                setLoading(false)
                setText('')
                setOpen(false)
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
  return (
   <>
    <div className={styles.wrapper}>
        <textarea value={text} className={styles.textarea} onChange={(e)=> setText(e.target.value)}>

        </textarea>
        <Button className={styles.button} types='add' onClick={handleSubmit}>Post Reply</Button>
    </div>
    <ToastContainer/>
   </>
  )
}

export default AddRepliesComment