import React from "react";
import { NavLink } from "react-router-dom";
import "./cardSearch.css"

export default function CardSearch({id, img, name, weightMetric, weightImperial, temperaments }){
    return (
       <>
        <img src={img} alt={name}/>
        <div className="box-q">
        <NavLink to={"/dogs/"+id} style={{textDecoration: 'none' }}> 
        <h1 className="h12">{name}</h1>
        </NavLink> 
        <div className="box-s">
        <div className="weight-s">
        <div><strong>Weight</strong>
         <p>Metric: {weightMetric}</p>
         <p>Imperial: {weightImperial}</p>
        </div>
        <div className="box-z">
        <div><strong>Temperaments </strong></div>
        <p> {temperaments}</p>
        </div> 
        </div>
        </div>
        </div>
    </>
    )
}