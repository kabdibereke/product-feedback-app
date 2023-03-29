import { IProductRequests } from '@/interface/interface'
import { AppDispatch, RootState } from '@/store/intex'
import { addList } from '@/store/slice/sortSlice'

import { onValue, ref } from 'firebase/database'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

import { db } from '../../../firebase'
import Feedback from '../Feedback/Feedback'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import styles from './Main.module.scss'

const Main = () => {
  const [loading, setLoading] =useState(false)
  const [error, setError]= useState(false)
  const {filterResult,sortResult,requestList} = useSelector((item:RootState)=>item.sortList)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  useEffect(()=> {
    setLoading(true)
    try {
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val()
        if (data !== null) {
          console.log(Object.values(data))
          dispatch(addList(Object.values(data)))
          setLoading(false)
        }
      });
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  },[])

  useEffect(()=> {
    if(sortResult=='Most Upvotes') {
      const newArr = [...requestList].sort((a, b) => b.upvotes - a.upvotes);
      dispatch(addList(newArr))
    }
    if(sortResult=='Least Upvotes') {
      const newArr = [...requestList].sort((a, b) => a.upvotes - b.upvotes);
      dispatch(addList(newArr))
    }

    if(sortResult=='Most Comments') {
      const newArr = [...requestList].sort((a, b) =>  {
        if(a.comments && b.comments) {
          return  b.comments.length -a.comments.length
        }else if (a.comments ){
          return  0 -a.comments.length
        }else if (b.comments ) {
          return  b.comments.length -0 
        }else {
          return  0-0 
        }
      });
      dispatch(addList(newArr))
    }
    if(sortResult=='Least Comments') {
      const newArr = [...requestList].sort((a, b) =>  {
        if(b.comments && a.comments) {
          return  a.comments.length -b.comments.length
        }else if (b.comments ){
          return  0 -b.comments.length
        }else if (a.comments ) {
          return  a.comments.length -0 
        }else {
          return  0-0 
        }
      });
      dispatch(addList(newArr))
    }
   
  },[sortResult])
  return (
    <>
   
    <div>
        <Navbar suggestList={requestList.filter(item=> {
          if(filterResult=='All') {
            return item
          }else {
            return item.category.includes(filterResult.toLowerCase())
          }
        })}/>
        {loading && <div className={styles.spinner}>
          <ClipLoader
          color="#AD1FEA"
          size={100}
        />
          </div>}
        {requestList.filter(item=> {
          if(filterResult=='All') {
            return item
          }else {
            return item.category.includes(filterResult.toLowerCase())
          }
        }).map((item,index)=> {
          return <Feedback key={index} item={item}  click={true}/>
        })}
        
      
    </div>
    </>
  )
}

export default Main