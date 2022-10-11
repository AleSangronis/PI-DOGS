import React from "react";
import "./dogs.css"
import { Link } from 'react-router-dom';
import { addFavorites } from "../../../redux/actions";
import { borrareDog, getDogs } from "../../../redux/actions/index"
import { useDispatch } from "react-redux";


export default function Dogs({ id, name, weightMetric, weightImperial, heightMetric, heightImperial, life_span, image, temperaments, createInDb}){
    
    const dispatch=useDispatch()
    const handleOnClick=(e)=>{
        e.preventDefault();
      dispatch(addFavorites(id))  
    }
    const deleteDog=(e)=>{
        dispatch(borrareDog(id))
        dispatch(getDogs())
    }

    return (
        <> <img src={image} alt={name} />  
        <div className="box-s">
        <Link to={`/dogs/${id}`} style={{textDecoration: 'none' }}>
        <h1 className="h11">{name}</h1>
        </Link> 
        <div className="box">
        <div className="weight">
        <div><strong>Weight</strong></div>
         <p>Metric: {weightMetric} kg<p>Imperial: {weightImperial} lb</p> </p>
        </div> 
        <div className="box-a">
        <div><strong>Temperaments</strong></div>
        <p>{temperaments}</p>
        </div> 
        </div>
        <div>
        <button onClick={handleOnClick}>❤</button>
        {createInDb==="true" && <button onClick={deleteDog}>🗑️</button> }
        </div>
        </div>
    
        </>
        
    );
    

}