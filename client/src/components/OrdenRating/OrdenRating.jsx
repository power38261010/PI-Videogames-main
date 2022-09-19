import React from 'react'
import { ordenRating } from '../../redux/action'
import style from '../OrdenRating/OrdenRating.module.css'
import { useDispatch } from 'react-redux'

export default function OrdenRating({setPaginaActual, setOrder}){

  const dispatch= useDispatch()

  function handleOrdenRating(e){
    e.preventDefault()
    dispatch(ordenRating(e.target.value))
    setPaginaActual(1);
    setOrder(`ordenado${e.target.value}`)
    e.target.value = 'default'
  }

  return (
    <div className={style.algo}>Clasificación
      <select name='select' onChange={e=>{handleOrdenRating(e)}} defaultValue="default">
          <option value='default' disabled='disabled'>Rating</option>
          <option value='all'>Normal</option>
          <option value='rMin'>Mínimo</option>  
          <option value='rMax'>Máximo</option>                     
      </select>
    </div>
  )
}
