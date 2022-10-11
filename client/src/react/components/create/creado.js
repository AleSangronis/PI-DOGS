import React from "react";
import Check from "../../../img/icons-check.png"
import "./creado.css"
import { Link } from "react-router-dom";

export default function Creado ({ setearCreado }){
    

    return(
        <div className="creado">
            <div className="check">
                <span>Successfully Created</span>
               <img src={Check} alt="check"></img>
               <div className="buttons">
                <Link to="/dogs" style={{ textDecoration: 'none' }}>
               <button className="but-home"><strong>HOME</strong></button>
               </Link>
               <button className="but-cerrar" onClick={()=>setearCreado()}>❌</button>
               </div> 
            </div>
        </div>
    )

}