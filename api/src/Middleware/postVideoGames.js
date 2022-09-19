const {Videogame, Genre} = require ('../db')
 

const createVG = async (name, description, released, rating, genres, platform )=>
{
    
    let newGame = await Videogame.create({
        name, 
        description, 
        released, 
        rating,
        platform
    })

const addGenres= await Genre.findAll({   where:{ name: genres  }  })

newGame.addGenres(addGenres)

return `Juego ${newGame.name} creado con éxito`;
}

module.exports={
    createVG,
}