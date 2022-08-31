import React from 'react'
import { Link } from 'react-router-dom'

import styles from "../styles/Landing/LandingPage.module.css";
import "../styles/Landing/Animation.css";

const LandingPage = () => {
  return (
    <div className={styles.div}>
    <div className={styles.title}>
       <span className='animation'>Bienvenidos</span>
       <Link className={styles.link} to='/home'>
         <button className={styles.btn}>INGRESAR</button>
       </Link>
    </div>
    </div>
  )
}

export default LandingPage
