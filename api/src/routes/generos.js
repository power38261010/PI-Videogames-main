const {Router} = require('express')
const {Genre} = require('../db')
const router = Router()

router.get('/', async (req, res, next)=>{
try
{
    const generosDb= await Genre.findAll()

    const filtroDb= generosDb.map(e=>{
        return{
            id: e.id,
            name: e.name
        }
    })
    res.send(filtroDb)

}
catch (error) { next(error)  }
})

module.exports = router