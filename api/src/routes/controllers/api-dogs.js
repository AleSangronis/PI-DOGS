const axios = require('axios').default;
const  { Dog, Temperament}  = require('../../bd/db.js');
const { Op } = require('sequelize');

 const { validate } = require("../validate/validate.js") 

const {
    API_KEY, API_URL
  } = process.env;


module.exports={
    getApi:async(name)=>{
        if(!name){
        let datosApi= await axios(`${API_URL}?${API_KEY}`)
        let datosBd= await Dog.findAll( {
            include: {
                model:Temperament,
                attributes:['name'], 
                through:{
                    attributes:[],
                },
            }
        })
        let datosApiNeed=await datosApi.data.map(el=>{
            let datos={
                "id":el.id,
                "name":el.name,
                "weight":validate(el.weight),
                "height":el.height,
                "life_span":el.life_span,
                "temperaments":el.temperament,
                "image":el.image,
            }
            return datos
        })
       
        let union= await datosApiNeed.concat(datosBd)
        return union  
       
        }
        else{
        const datosNameApi= await axios(`${API_URL}search?q=${name}&${API_KEY}`)
        const datosNameBd= await Dog.findAll({
            where:{
                name:{[Op.iLike]:`%${name}%`}
            }, 
            include: {
                model:Temperament,
                attributes:['name'], 
                through:{
                    attributes:[],
                }
        }})
        let datosApiNeedName=await datosNameApi.data.map(el=>{

             let datos={
                 "id":el.id,
                 "name":el.name,
                 "weight":validate(el.weight),
                 "height":el.height,
                 "life_span":el.life_span,
                 "temperaments":el.temperament,
                 "reference_image_id":el.reference_image_id,
             }
             return datos
         })

        let union=await datosApiNeedName.concat(datosNameBd)
            return union
       
        }},
        getId:async(idd)=>{
            const datosApi= await axios(`${API_URL}?${API_KEY}`)
            const searchId= await datosApi.data.filter(el=>el.id==idd)
            if(searchId.length>0) {
                return searchId.map(el=>{
                        let datos={
                            "id":el.id,
                            "name":el.name,
                            "weight":validate(el.weight),
                            "height":el.height,
                            "life_span":el.life_span,
                            "temperaments":el.temperament,
                            "image":el.image
                        }
                        return datos
                    })
            }
            else{
                let datosBd= await Dog.findAll( {
                    include: {
                        model:Temperament,
                        attributes:['name'], 
                        through:{
                            attributes:[],
                        },
                    }
                })
                const bd=datosBd.filter(el=>el.id==idd)
                if(bd.length>0) return bd
                else {
                    throw new Error("no existe id")

            } }},

        postDog:async(name,weightmax,weightmin,heightmax,heightmin,life,image,temperaments)=>{
            let weight={
                "metric":weightmin+" - "+weightmax
            }
            let height={
                "metric":heightmin+" - "+heightmax
            }
    
            if(!name || !weight || !height ) throw new Error("Faltan datos")
            let creacion=await Dog.create({
                name,
                weight,
                height,
                life_span:life,
                image,
            });
            
            if(temperaments){
                let temperamentsArray=await Temperament.findAll({
                    where:{ name: temperaments}})
             await creacion.addTemperament(temperamentsArray)
            }
            return creacion
        },

        deleteDog:async(idd)=>{
                let dogsDb=await Dog.findAll()
                let filterId=dogsDb.filter(el=>el.id==idd)
                if(filterId.length>0){
                    await Dog.destroy({
                        where:{
                            id:idd
                        }
                    })
               return "exitoso"
                }
                else{
                    throw new Error("no existe id en bd")
                }},

        udpateDog:async(id, name/* , weightmax,weightmin,heightmax,heightmin,life,image,temperaments */)=>{
            
            try{
                await Dog.update({name:name},{
                where:{id:id}
            })
            return "Perrito actualizado"
        }
        catch(e){
            throw new Error("ocurrio un error")
        }
        } 
};