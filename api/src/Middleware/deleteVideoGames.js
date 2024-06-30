const {Videogame, Genre} = require ('../db')

const deleteVG = async (id) => {
    const videoDelete= await Videogame.findByPk(id,{
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes:[]
            }}
    })

    if(videoDelete) {
        await videoDelete.destroy();
        return true;
    }
    else{ return false; }
}

 module.exports={ deleteVG }