const initialState={
    dogsFavorites:[],
    dogsDetail:{},
    dogsLoaded:[],
    dogsSearch:[],
    dogsSearchDetail:[],
    dogsLoadedCoped:[],
    dogsTemperaments:[],
    dogsError:{},
}
function rootReducer(state=initialState,action){
    switch(action.type){
        case "GET_DOGS":
        return{
            ...state, 
            dogsLoaded:action.payload, 
            dogsLoadedCoped:action.payload
        }
        case "GET_TEMPERAMENTS":
            return {
                ...state, dogsTemperaments:action.payload
            }
        case "GET_DOGS_NAME":
          
            let unicos=null
        if(action.payload!=="Raza inexistente"){
            let datos=action.payload
            datos=state.dogsSearch.concat(datos)
          let dogs=datos.map(item=>{
           return [item.id,item]
          })
         let dogsArr=new Map(dogs)
         unicos=[...dogsArr.values()]
         }
      
            return{
                ...state,
                dogsSearch:unicos!==null ? state.dogsSearch.length===0 ? action.payload : unicos : state.dogsSearch,
                dogsLoaded:unicos!==null ? action.payload : state.dogsLoaded,
                dogsError:unicos===null ? {name: "Raza inexistente"} : {},

            }
        case "DELETE_SEARCH":
            return {
                ...state,dogsSearch:[]
            }

        case "DELETE_ERRORES":
            return{
                ...state,dogsError:{}
            }

        case "ADD_FAVORITES":
            let favorita=state.dogsLoaded.filter(el=> !el.createdInDb ? el.id===parseInt(action.payload) : el.id===action.payload)
            let favoritaId=[...state.dogsFavorites, favorita]
            let map=favoritaId.map(item=>{return [item[0].id,item]})
            let favoritesMapeo=new Map(map)
            let favoritesUnico=[...favoritesMapeo.values()]
           console.log(favoritesUnico)
           
            return {
                ...state,dogsFavorites:favoritesUnico
            }
        case "REMOVE_FAVORITES":
            
            return {
                ...state, dogsFavorites:state.dogsFavorites.filter(el=>parseInt(el[0].id)!==parseInt(action.payload))

            }
         case "GET_DOGSBYID":

            let idDatos=null
            if(action.payload!=="ID Inexistente"){
                idDatos=action.payload
            }
            return{
                ...state, dogsDetail: idDatos!==null? action.payload : state.dogsDetail,
                dogsError:idDatos===null ?  {id: "ID Inexistente"}: {},
    
            }

        case "FILTER_TEMPERAMENTS":
        let allDogs=state.dogsLoadedCoped
        const filterTemperaments=action.payload === "All" ? allDogs: allDogs.filter((el)=>el.temperaments?.includes(action.payload))
            return {
                 ...state , dogsLoaded:filterTemperaments
                }

        case "FILTER_RAZA":
        let allRazas=state.dogsLoadedCoped
        let filterRaza=action.payload==="created"? allRazas.filter((el)=>el.createdInDb) : allRazas.filter((el)=>!el.createdInDb)
        return {
            ...state,
            dogsLoaded: action.payload ==="All" ? allRazas : filterRaza,
            
        }
        case "POST_DOGS":
        return{
            ...state
        }
        case "DELETE_DOGS":
        return{
            ...state
        }
        case "FILTER_ALFABETICO":
           let ordenamiento= action.payload==="asc"? state.dogsLoaded.sort((a,b)=>{
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            if(b.name.toLowerCase() > a.name.toLowerCase()){
                return -1
            }
            return 0; }) :state.dogsLoaded.sort((a,b)=>{
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1}
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1
                }
                return 0;
            })
            return{
                ...state, dogsLoaded:ordenamiento
            }
            case "FILTER_PESO":
                let peso= action.payload==="asc"? state.dogsLoaded.sort((a,b)=>{
                 if(parseInt(a.weight.metric.slice(0,2).trim()) > parseInt(b.weight.metric.slice(0,2).trim())){
                     return 1;
                 }
                 if(parseInt(b.weight.metric.slice(0,2).trim()) > parseInt(a.weight.metric.slice(0,2).trim())){
                     return -1
                 }
                 return 0; }) :state.dogsLoaded.sort((a,b)=>{
                     if(parseInt(a.weight.metric.slice(0,2).trim()) > parseInt(b.weight.metric.slice(0,2).trim())){
                         return -1}
                     if(parseInt(b.weight.metric.slice(0,2).trim()) > parseInt(a.weight.metric.slice(0,2).trim())){
                         return 1
                     }
                     return 0;
                 })
                 return{
                     ...state, dogsLoaded:peso
                 }
            
        
        default:
            return state
    }
    
}

export default rootReducer;