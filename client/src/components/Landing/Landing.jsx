import React from 'react'
import { Link } from 'react-router-dom'
import style from '../Landing/Landing.module.css'
import { getvideogames } from '../../redux/action'
import { useDispatch } from 'react-redux'
import  { useEffect } from 'react'

export default function Landing(){
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getvideogames())
  },[dispatch])
  // dispatch(getvideogames())


  return (
    <div className={style.content}>
       
        <div className={style.falso}>
          </div>
  
         
          <div className={style.enter}>
          <Link to='/home'><button className={style.img}></button></Link>

        </div>
    </div>
  )
}