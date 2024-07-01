const axios = require('axios');
require('dotenv').config();
const {API_KEY , API_GAME } = process.env;
const {Videogame, Genre} = require ('../db');


const infoApi = async () => {
    const games= [];
    let url= `${API_GAME}${API_KEY}`;

    for (let i = 1; i < 6; i++) {

        let pages = await axios.get(url)

        pages.data?.results?.forEach( (e) => {
            let  plataforma =[]
            e.platforms?.map(p=>plataforma.push(p.platform.name))
            games.push({
                id: e.id,
                name: e.name,
                released: e.released,
                rating: e.rating,
                image: e.background_image,
                // platform: e.platforms.map(p=>p.platform.name),
                plataform: plataforma,
                genres: e.genres?.map(e=>e.name),
            })
        })
        url= pages.data.next
    }
    return games
}

const infoDb= async()=>{
    const VG = await Videogame.findAll({
        include:{
            model: Genre,
            attributes:['name'],
            through:{
                attributes:[]
            }
        }
    })
    const modeloVG =  VG?.map(e=>({
        id: e.id,
        name: e.name,
        description: e.description,
        released: e.released,
        rating: e.rating,
        image: "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg",
        platform: e.platform,
        genres: e.genres?.map(e=>e.name)
    }))
    return modeloVG
}

const infoAll = async (name)=>{
    const API= await infoApi()
    const DB= await infoDb()
    const infoTotal= [...DB, ...API]
    const infoObject = infoTotal?.map(e=>{
        return {
        id: e.id,
        name: e.name,
        genres: e.genres,
        image: e.image,
        plataform: e.plataform,
        rating: e.rating
        }
    })
    if (name) {
        let nameParam = name?.toLowerCase();
        let infoName = infoObject?.filter( e => e.name.toLowerCase()?.includes(nameParam) )?.slice(0,15);
        if (infoName) return infoName;
    }
    return infoObject;
}

const infoById = async(id)=> {
    if(typeof id === 'string' && id.length>8) {
        const e = await Videogame.findByPk( id, {
            include:{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes:[]
                }
            }
        });
            const idDb = {
                id: e.id,
                name: e.name,
                description: e.description,
                released: e.released,
                rating: e.rating,
                image: "https://ceinaseg.com/wp-content/uploads/2021/09/videogames-controller-1920x1080-1.jpg",
                platform: e.platform,
                genres: e.genres?.map(e=>e.name)
            };
            return idDb;
    } else {
        const idApi= await axios.get(`${API_GAME}/${id}${API_KEY}`);
        const a = idApi.data;
        const info = {
            id:a.id,
            name: a.name,
            image: a.background_image,
            description: a.description_raw,
            released: a.released,
            rating: a.rating,
            platform: a.platforms?.map(e=>e.platform.name),
            genres: a.genres?.map(e=>e.name)
        }
        return info;
    }
}

module.exports={
    infoApi,
    infoDb,
    infoAll,
    infoById,
}