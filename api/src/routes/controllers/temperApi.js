const axios = require('axios').default;
const {Temperament}=require('../../bd/db.js')
const {
    API_KEY
  } = process.env;


async function getTemp(){
    let datosDb=await Temperament.findAll()
    if(datosDb.length==0){
    const datosApi=await axios(`https://api.thedogapi.com/v1/breeds/?${API_KEY}`)
    const temperamentoApi=await datosApi.data.map((el)=>el.temperament)
    const ordenamientoTemperamento=await temperamentoApi.toString().split(",")
    const temperamentos=ordenamientoTemperamento.map(el=>el.trim()).filter(el=>el)
    const unicoTemp=[...new Set(temperamentos)]
    try{
        let creacion=unicoTemp.map((el)=>Temperament.create({name:el}))
        let todos=await Promise.all(creacion)
        return todos
    }
    catch(e){
        throw Error("no se puede")
    }
}
return datosDb
    }

    module.exports={getTemp};
