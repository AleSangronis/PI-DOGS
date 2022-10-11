import "./home.css"
import React from "react"
import { Link } from "react-router-dom"
export default function LandingPage(){
    return(
       <div className="fondo">
        <Link to="/dogs" style={{textDecoration: 'none'}}>
        <div id="btn">
            <span >Getting started</span>
            <div id="circle"></div>
            </div>
            </Link>
       </div> 
    )

}