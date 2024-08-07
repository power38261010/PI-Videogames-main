import axios from 'axios'
import { 
    GET_DETALLE, 
    FILTRO_API_DB, 
    FILTRO_GENRES, 
    GET_GENRES, 
    GET_NAME, 
    GET_VIDEOGAMES, 
    ORDEN_ABC, 
    ORDEN_RATING, 
    CLEAR_DETALLE, 
    CLEAR_SEARCH,
    HOME, 
    CLEAR_HOME,
    DELETE_VIDEOGAME_DB,
    DELETE_VIDEOGAME_API,
    CREATE_VIDEO,


} from './constantes'
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';



export function getvideogames(){
    return async function (dispatch){
        try {
            let videogames= await axios.get('api/videogames')
            return dispatch({
                type: GET_VIDEOGAMES,
                payload: videogames.data
            })
        } catch (error) {
            console.error('error ',error)
            console.log(error)
        }
    }
}
export function home(payload){
    return{
        type: HOME,
        payload
    }
}
export function getName(name){
    return async function(dispatch){
        try {
            let json = await axios.get(`api/videogames?name=${name}`)
            return dispatch({
                type: GET_NAME,
                payload: json.data
            })
        } catch (error) {
            console.error('error ',error)
            alert(`El nombre " ${name} " no corresponde a un VideoGame existente`)
        }
    }
}

export function getGenres(){
  return async (dispatch)=>{
    try {
      let infogenres = await axios.get('api/generos')
      return dispatch({
          type: GET_GENRES,
           payload: infogenres.data?.map(genero => genero)
      })
    } catch (error) {
        console.log(error)
    }
  }
}

export function filtroGenres(payload){
    return{
        type: FILTRO_GENRES,
        payload
    }
}


export function filtroCreadosApi(payload){
    return{
        type: FILTRO_API_DB,
        payload
    }
}
export function crearVideoGames(game){
    return async function(dispatch){
        const crear = await axios.post(`api/videogames`, game)
        console.log("datos post: "+ await crear.data )
        return dispatch ({type: CREATE_VIDEO , payload: crear.data})
    }
}
export function deleteVideogame(id){
    if(typeof id === 'string' && id.length>8)
    {
        return async function (dispatch){
        await axios.delete(`api/videogames/${id}`)
        return dispatch({
            type: DELETE_VIDEOGAME_DB
        })
    }}
    else{
        return{
            type:DELETE_VIDEOGAME_API,
            payload: id
        }
    }

}
export function ordenABC(payload){
    return{
        type: ORDEN_ABC,
        payload
    }
}

export function ordenRating(payload){
    return{
        type: ORDEN_RATING,
        payload
    }
}

export function getDetalle(id){
    return async function(dispatch){
        try {
            const detail= await axios.get(`api/videogames/${id}`)

            return dispatch({
                type: GET_DETALLE,
                payload: detail.data
            })
        } catch (error) {
            console.error('error ',error)
            console.log(error)
            return dispatch({
                type: GET_DETALLE,
                payload: {name:404}
            })
        }
    }
}

export function clearDetalle(){
    return{
        type: CLEAR_DETALLE,
    }
}
export function clearSearch(){
    return{
        type: CLEAR_SEARCH,
    }
}
export function clearHome(){
    return{
        type: CLEAR_HOME,
    }
}