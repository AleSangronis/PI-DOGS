import React from "react";
import { useSelector } from "react-redux";
import Favorite from "../favorite/favorite.js"
import Navegation from "../navegation/navegation";
import "./favorite.css"

export default function Favorites(){
    const favorites=useSelector(state=>state.dogsFavorites)
    const [page,setPage]=React.useState(0)
    const [cantidadDogs, setCantidadDogs]=React.useState(8)
    const favoritesPage=favorites?.slice(page,cantidadDogs)
    const titulo="Favorites";
   
    let key=2774384
    const nextPage=()=>{
        if(favorites.length>cantidadDogs){
            setPage(page+8)
            setCantidadDogs(cantidadDogs+8)  
        }
    }
    const previewPage=()=>{
        setPage(page-8)
        setCantidadDogs(cantidadDogs-8) 
    }

   
    return(
        <div className="fav-home" >
            <Navegation titulo={titulo}/>
    
            {favorites.length===0 ? 
            <div className="titulo">
                <h1 className="fav-h1">Aun no hay favoritos</h1>
                </div> :
                <div className="titulo"><h1 className="fav-h1">Your Favorite Dogs</h1></div>
                 }
                 <div className="botones">
            {page!==0 &&
            <button onClick={previewPage}>Preview</button>}
            <button onClick={nextPage}>Next</button>
            </div>
            <div className="container-fav">
             {favoritesPage && favoritesPage.map((el)=>{
                return (
                    <div key={key++} className="favorites">
                        <Favorite id={el[0].id}
                         name={el[0].name} 
                         weightMetric={el[0].weight?.metric} 
                         weightImperial={el[0].weight.imperial ? el[0].weight.imperial : "null"} 
                         heightMetric={el[0].height?.metric} 
                         heightImperial={el[0].height.imperial ?el[0].height.imperial : "null"}
                         image={el[0].image.url ? el[0].image.url : el[0].image}
                         temperaments={!el[0].createdInDb ? el[0].temperaments : el[0].temperaments.map(el=>el.name + (", "))}  />

                    </div>
              ) })
            } 
            </div>
  </div>
       
    )

}