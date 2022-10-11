import React from "react";
import { useDispatch, useSelector } from  "react-redux";
import { getDogsById } from "../../../redux/actions/index"

import Errores from "../errores/errores";
import Navegation from "../navegation/navegation";
import Loader from "../loader/loader";
import "./raza.css"

export default function DetailsDogs(props){
    const id=props.match.params.idRaza
    const dispatch=useDispatch()
    const details=useSelector((state)=>state.dogsDetail)
    const error=useSelector(state=>state.dogsError) 
    React.useEffect(()=>{
    dispatch(getDogsById(id))
    },[dispatch, id, props])
    
   
    return (
        <div className="raza-detail">
            <Navegation/>
            {error.id ? <Errores name={error.id} home="/dogs"/> :
            (!details.createdInDb && details.id!==parseInt(id)) || (details.createdInDb && details.id!==id )? 
            <Loader /> : 
            <div className="details">
            <img className="image-detail" src={details.image.url? details.image.url : details.image} alt={details.name}/>  
             <div className="contenido"> 
            <h1 className="titu">~{details.name}~</h1>
            <div className="weight-detail">
            <p className="tit"><strong>Weight</strong></p>  
            <p>Metric: {details.weight.metric} Kg <p>Imperial: {details.weight.imperial? details.weight.imperial : "Null"} Lb</p> </p>
            </div>
            <div className="height-detail">
            <p className="tit"><strong>Height</strong></p>  
            <p>Metric: {details.height.metric} <p>Imperial: {details.height.imperial? details.height.imperial : "Null"}</p> </p>
            </div>
            <div className="span">
            <p className="tit"><strong>Life span</strong> </p>
            <p>{details.life_span}</p>
            </div>
            <div className="temperaments">
            <p className="tit"><strong>Temperaments</strong> </p>
            <p>{!details.createdInDb ? details.temperaments : details.temperaments.map(el=>el.name + (", "))}</p>
            </div>
            </div>
            </div>
            }
            
            </div>
            

       
)

}