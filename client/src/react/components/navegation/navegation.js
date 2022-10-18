import React from "react"
import "./navigation.css"
import Search from "../navegation-search/search.js"
import { Link } from "react-router-dom"

export default function Navegation({titulo, seteo}){
    return (
        <div className="navega">
      <p className="p" >Dogs Place</p> 
        
               <Link to="/dogs" style={{textDecoration: 'none' }}>
                <button className={titulo==="DogsHome"? "li-activo" :"li"}> Home </button>
               </Link > 
               <Link to="/dogs/select/favs" style={{textDecoration: 'none' }}>
                <button className={titulo==="Favorites"? "li-activo" :"li"}>Your Favorites</button>
                </Link>
                <Link to="/dogs/result/search" style={{textDecoration: 'none' }}>
                <button className={titulo==="DogsSearchs"? "li-activo" :"li"} > Your Searchs</button>
                </Link>
                <Link to="/dogs/created/new" style={{textDecoration: 'none' }}>
                <button className={titulo==="Created"? "li-activo" :"li"} >New Creation</button>
                </Link>
        

       {titulo==="DogsHome" &&<Search seteo={seteo} /> } 
        </div>

    )
    
}