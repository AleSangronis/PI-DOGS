import "./home.css"
import React from "react"

 import { Link } from "react-router-dom" 

export default function LandingPage(){
    return(
       
       <div className="fondo">
        <div className="btn-contenedor">
         <Link to="/dogs" style={{textDecoration: 'none'}}> 
        <div className="btn1">
        <span>Getting started</span>
        <div id="circle"></div>
        </div>
        </Link>  
        <a href="https://www.linkedin.com/in/alexandra-carolina-araujo-sangronis-4568a8154" > 
        <div className="btn2">
        <span>
        Linkedln
        </span>
        <div id="circle"></div>
        </div>
       </a>
       
  
       </div> 
       </div>
       
    )

}