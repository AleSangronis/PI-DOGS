import axios from "axios";
let url_dogs="http://localhost:3001/dogs"
let url_temperaments="http://localhost:3001/temperaments"
let url_dogs_name="http://localhost:3001/dogs?name="


export function getDogs(){
    return function (dispatch){
        return fetch(url_dogs)
        .then(res =>res.json())
        .then(res=>{
            dispatch({
                type: "GET_DOGS", payload:res
            })
        })
    }
};
export function getDogsName(name){
    return function (dispatch){
        return fetch(`${url_dogs_name}${name}`)
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type: "GET_DOGS_NAME", payload:res
            })
        })
    }
};

export function getTemperaments(){
    return function (dispatch){
        return fetch(url_temperaments)
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type: "GET_TEMPERAMENTS", payload:res
            })
        })
    }
};
export function getDogsById(id){
    return function (dispatch){
        return fetch(`${url_dogs}/${id}`)
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type: "GET_DOGSBYID", payload:res
            })
        })
    }
};

export function postDog(body){
    return async function(dispatch){
        const respuesta=await axios.post(url_dogs, body)
  
        return respuesta
    }

};

export function borrareDog(id){
    return async function(dispatch){
        const respuesta= await axios.delete(`${url_dogs}/${id}`)
       
        return respuesta
    }

}

export function filterTemperaments(value){
    return{
        type:"FILTER_TEMPERAMENTS",
        payload:value
    }

};
export function deleteSearch(){
    return {
        type:"DELETE_SEARCH"   
    }
}
export function addFavorites(id){
    return {
        type:"ADD_FAVORITES",
        payload:id   
    }
};
export function removeFavorites(id){
    return {
        type:"REMOVE_FAVORITES",
        payload:id   
    }}
export function filterRaza(value){
    return{
        type:"FILTER_RAZA",
        payload:value
    }
};
export function filterOrdenamiento(value){
    return{
        type:"FILTER_ORDENAMIENTO",
        payload:value
    }
};

export function DeleteErrores(){
    return{
        type:"DELETE_ERRORES"
    }
}

export function pageReload(){
    return{
        type:"RELOAD"
    }
}


