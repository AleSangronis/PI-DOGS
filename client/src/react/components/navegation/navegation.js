import React from "react"
import "./navigation.css"
import Search from "../navegation-search/search.js"
import { Link } from "react-router-dom"

export default function Navegation({titulo}){
    return (
        <div className="navega">
            <p className="p">Dogs Place<p className="cor">❤</p></p>
        <nav className="menu">
        <ol>
                
               <Link to="/dogs" style={{textDecoration: 'none' }}>
                <li className={titulo==="DogsHome"? "li-activo" :"li"}> Home </li>
               </Link > 
               <Link to="/dogs/select/favs" style={{textDecoration: 'none' }}>
                <li className={titulo==="Favorites"? "li-activo" :"li"}>Your Favorites</li>
                </Link>
                <Link to="/dogs/result/search" style={{textDecoration: 'none' }}>
                <li className={titulo==="DogsSearchs"? "li-activo" :"li"} > Your Searchs</li>
                </Link>
                <Link to="/dogs/created/new" style={{textDecoration: 'none' }}>
                <li className={titulo==="Created"? "li-activo" :"li"} >New Creation</li>
                </Link>
               {/*  <li className="item"><Search/></li> */}
            </ol>
        </nav>
        <Search /> 
        </div>

    )
    
}