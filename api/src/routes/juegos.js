const {Router} = require('express')
const { infoAll, infoById} = require('../Middleware/getVideoGames')
const { createVG } = require('../Middleware/postVideoGames')
const { modificarVG } = require('../Middleware/putVideoGames')
const { deleteVG } = require('../Middleware/deleteVideoGames')
const router = Router()

router.get('/', async (req, res, next)=>{
try
{

    const {name} = req.query
    let juegos = await infoAll(name)

    if(name)
    {
        if(juegos.length){  res.send(juegos)  }
        else  { res.status(404).send('El Video Juego no existe') }
    }

    else{  res.send(juegos)  }

}
catch (error) {  next(error)  }
})

router.get('/:id', async (req, res, next)=>{
const {id} = req.params

try
{
    const filtroId= await infoById(id)
    return res.send(filtroId)
} 
catch (error) { next(error)  }
})

router.post('/', async (req, res, next)=>{
const {name, description, released, rating, genres, platform} = req.body
// console.log(name +" "+ description+" "+released+" "+rating+" "+genres+" "+platform)
try
{
    let newGame = await createVG( name, description, released, rating, genres, platform  )

    res.send(newGame)

}
catch (error) {  next(error) }
})

router.put('/:id', async (req, res, next)=>{
const {id} = req.params
const {name, description, rating, released, platform,genres} = req.body
  
try 
{
    const putVG = await modificarVG  (name, description, rating, released, platform, id, genres)
    res.send(putVG)
} 
catch (error) {  next(error) }    
})

router.delete('/:id', async (req,res,next)=>{
const {id} = req.params
try
{
const videoDelete =  await deleteVG(id)
if(videoDelete)
{
    return res.send('Videojuego eliminado!')
}
res.status(404).send('Videojuego no encontrado')
} catch (error) {  next(error)  }
})

module.exports = router