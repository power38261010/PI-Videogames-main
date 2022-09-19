  const {Videogame, Genre} = require ('../db')
    const modificarVG = async  (name, description, rating, released, platform, id, genres) =>{
    let updateVG = await Videogame.findOne({ where:{ id: id,  },
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes:[]
            }}
    });
    if (name) { updateVG.name = name; }
    if(description) { updateVG.description = description; }
    if(rating) { updateVG.rating = rating; }
    if(released) { updateVG.released = released; }
    if(platform !== []){ updateVG.platform = platform;}
    if(genres !== []) {
        let genDb= await Genre.findAll({    where:{    name: genres,  },  });
           await updateVG.setGenres(genDb);
    }
    updateVG.save()
return `Juego ${updateVG.name} actualizado`
}

module.exports={ modificarVG }