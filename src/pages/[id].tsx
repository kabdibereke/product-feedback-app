import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import CommentsPage from '@/components/CommentsPage/CommentsPage'
import { AppDispatch, RootState } from '@/store/intex'
import { useDispatch, useSelector } from 'react-redux'
import { onValue, ref } from 'firebase/database'
import { db } from '../../firebase'
import { addList } from '@/store/slice/sortSlice'
type Props = {}

const Detail = (props: Props) => {

  

  return (
    <div className="container">
        <CommentsPage/>
    </div>
  )
}

export default Detail