import React from "react";
import "./paginado.css"

export default function Paginado({page, cantidadDogs, dogs, NextPage,PreviewButton}){
    const pageNumbers=[]

    for(let i=0; i<Math.ceil(dogs.length/cantidadDogs);i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav className="nave"> 
            <ul className="uli">
                <li className="li"><button className="but" onClick={()=>PreviewButton()}>Preview</button></li>
                {pageNumbers && pageNumbers.map(el =>(
                    <li key={el} className="li">
                          <button className={page===el ? "but-activo":"but"} onClick={()=>NextPage(el)}><strong>{el}</strong></button>
                    </li>
                ))}
               <li className="li"> <button className="but" onClick={()=>NextPage()} >Next</button></li>
            </ul>
        </nav>

    )



}