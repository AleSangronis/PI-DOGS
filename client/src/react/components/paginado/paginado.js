import React from "react";
import "./paginado.css"

export default function Paginado({page, cantidadDogs, dogs, NextPage,PreviewButton}){
    const pageNumbers=[]

    for(let i=0; i<Math.ceil(dogs.length/cantidadDogs);i++){
        pageNumbers.push(i+1)
    }

    return (
        <>
        
              <button className="but" onClick={()=>PreviewButton()}>Preview</button>
                {pageNumbers && pageNumbers.map(el =>(
                <button key={el} className={page===el ? "but-activo":"but"} onClick={()=>NextPage(el)}><strong>{el}</strong></button>
                ))}
                <button className="but" onClick={()=>NextPage()} >Next</button>
         
</>
    )



}