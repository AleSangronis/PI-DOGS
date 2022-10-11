import React from "react";
import "./404.css"
import { Link } from "react-router-dom";

export default function PaginaDefault(){

    return (
       
        <div>
        <div className="er">
            <div className="contenedor-error">
               <div className="perrito">
                </div> 
                <div className="info-404">
                <h1 className="h1-error">404 Page Not Found</h1>
                <label>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</label>  
                <br/>
                <Link to="/dogs" /* style={{ textDecoration: 'none'}} */ >
                <label>Press here to return </label>
                </Link>
                </div>
               
            </div>
        </div>
        </div>
       
    )
}