import React from 'react'
import style from '../Paginado/Paginado.module.css'


export default function Paginado({videoByPag, allVideos, paginado}){
  const pageNumero =[]

  for (let i = 1; i <= Math.ceil(allVideos/videoByPag); i++) {
      pageNumero.push(i)
  }
  return (
    <div className={style.pag}>      
        <ul>
            {pageNumero &&
            pageNumero.map(numero=>(
              <li>
                <span className={style.Btn}>
                <button  onClick={()=>paginado(numero)} key={numero}>{numero}</button>
                </span>
              </li>
            ))}

        </ul>

    </div>
  )
}
