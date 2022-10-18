import React from "react";
import { Link } from 'react-router-dom';
import { removeFavorites } from "../../../redux/actions/index"
import { useDispatch } from "react-redux";

export default function Favorite({ id, name, weightMetric, weightImperial, heightMetric, heightImperial, image, temperaments}){
const dispatch=useDispatch()
const remove=(e)=>{
    e.preventDefault()
    dispatch(removeFavorites(id))

}
    return (
    <>
    <img className="img" src={image} alt={name} /> 
    <div className="box-s">
    <Link to={"/dogs/"+id} style={{textDecoration: 'none' }}>
    <h1 className="h11">{name}</h1>
    </Link> 
    <div className="box">
    <div className="weight">
    <div><strong>Weight</strong> </div> 
    <div>
    <p>Metric: {weightMetric} kg </p>
    <p>Imperial: {weightImperial} lb</p>
    </div>
    </div> 
    <div className="box-a">
    <div><strong>Temperaments </strong> </div>
    <p>{temperaments}</p>
    </div>  
    </div>
    <button onClick={remove}>🗑️ </button> 
    </div>

    </>
)
}