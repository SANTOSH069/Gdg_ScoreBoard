import React from 'react'
import styles from "@/app/components/Banner.module.css";
import Image from 'next/image';
import logo from "@/app/public/logo.png"
const Banner = () => {
  return (
    <div className={styles.container}>
     <Image src={logo} width={300} height={300} alt='logo' className='ml-1 p-3'/>
    </div>
  )
}

export default Banner
