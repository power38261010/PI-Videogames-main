const axios = require('axios')
const {API_KEY , API_GENRE } = process.env
const {Genre} = require ('../db')
const URL  = `${API_GENRE}${API_KEY}`

const loadGeneros= async()=>{
  const genero = await Genre.findAll()
  if(!genero.length)
{
      const picar= await axios.get(URL)
      const datos= picar.data?.results?.map((e)=>{  return{ id:e.id , name : e.name}  }   )
      await Genre.bulkCreate(datos)
    
      console.log("DB Success")
}
else{
  console.log("DB Was Charged")
}
}

module.exports={
  loadGeneros,
}