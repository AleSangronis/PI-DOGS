import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PerritoDefault from "../../../img/huesos.jpg"
import { deleteSearch } from "../../../redux/actions/index"
import Navegation from "../navegation/navegation";
import CardSearch from "../search/cardSearch";
import "./dogsSearch.css"

export default function DogsSearchs(){
    let busqueda=useSelector(state=>state.dogsSearch)
    const [page,setPage]=React.useState(0)
    const [cantidadDogs, setCantidadDogs]=React.useState(8)
    const searchPage=busqueda?.slice(page,cantidadDogs)
    const dispatch=useDispatch()
    const titulo="DogsSearchs";
    let key=277839213
    const borrar=(e)=>{
        e.preventDefault()
        dispatch(deleteSearch())
        setPage(0)
    }
    const nextPage=()=>{
        if(busqueda.length>cantidadDogs){
            setPage(page+8)
            setCantidadDogs(cantidadDogs+8)  
        }
    }
    const previewPage=()=>{
        setPage(page-8)
        setCantidadDogs(cantidadDogs-8) 
    }


    return (
        <div className="search-home">
            <Navegation titulo={titulo}/>
            {busqueda.length===0 ? 
            <div className="titulo">
            <h1 className="search-h1"> Aun no tienes busquedas</h1> 
            </div>: 
            <div className="titulo"><h1 className="search-h1">Your Searchs Dogs</h1></div>}
            <div className="botones">
            {page!==0 && <button onClick={previewPage}>Preview</button> }
            {busqueda.length>8  && <button onClick={nextPage}>Next</button>}
            </div>
           <div className="container-search"> 
           {searchPage && searchPage.map((el)=>{
            return (
            <div key={key++} className="searchs">
            <CardSearch id={el.id} 
            img={el.image? el.image: el.reference_image_id ? `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg` : PerritoDefault}
            name={el.name}
            weightMetric={el.weight?.metric}
            weightImperial={el.weight.imperial? el.weight.imperial : "null"}
            temperaments={!el.createdInDb? el.temperament: el.temperaments.map((el)=>el.name+(", ")) }
            />
            </div>
            
            )})}
            </div>
            {busqueda.length!==0 && <button className="clear" onClick={borrar}>Borrar Historial</button>}
        
        </div>
    )
   

}