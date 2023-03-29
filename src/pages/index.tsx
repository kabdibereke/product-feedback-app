
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import Main from '@/components/Main/Main'
import Header from '@/components/Header/Header'


export default function Home() {
  return (
    <>
     <Header/>
     <div className='container main'>
     <div className='sidebar'>
     <Sidebar/>
     </div>
      <Main/>
    </div>
    </>
    
  )
}
