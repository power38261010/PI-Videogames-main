import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getName } from '../../redux/action'
import style from '../SearchBar/SearchBar.module.css'


export default function SearchBar({setPaginaActual}){
    const dispatch= useDispatch()
    const [name, setName] = useState('')

    function handleImputChange(e){
      e.preventDefault()
      setName(e.target.value)
    }

    function handleSubmit(e){
      e.preventDefault()
      !name
      ? alert('Por favor coloca el nombre de un VideoGame para buscar')
      : dispatch(getName(name))
      setName(e.target.value)
      setName('')
      setPaginaActual(1)
    }
    function handleKeyPress(e){
      if(e.whitch === 13){
        e.preventDefault()
        dispatch(handleSubmit())
      }
    }

  return (    
    <div>
      <form  className={style.searchbox} onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        <input
        className={style.inputsearch}
        autoComplete='off'
        type='text'
        name='search'
        id='search'
        value={name}
        placeholder='Ingrese el nombre'
        onChange={(e)=>handleImputChange(e)}
        />
        <button className={style.btnsearch}>Buscar</button>
      </form>

    </div> 
  )
}