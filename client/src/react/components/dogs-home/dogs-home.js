import React from "react";
import { getDogs, getTemperaments, filterTemperaments, filterRaza, filterAlfabetico, filterPeso } from "../../../redux/actions"
import { useDispatch, useSelector } from  "react-redux";
import Dogs from "../dogs/dogs.js"
import "./dogs-home.css"
import Paginado from "../paginado/paginado.js";
import image from "../../../img/div.png"
import Created from "../created dog-model/created.js"
import { Funciones } from "../created dog-model/Ventana.js"
import Navegation from "../navegation/navegation";
import Loader from "../loader/loader.js"
import Perrito from "../../../img/div.png"
import Errores from "../errores/errores";

const DogsHome=()=>{
    const dispatch=useDispatch()
    const [page, setPage]=React.useState(1)
    const [cantidadDogs]=React.useState(8)
    const dogs=useSelector((state)=>state.dogsLoaded)
    const temperaments=useSelector((state)=>state.dogsTemperaments)
    const [orden, setOrden]=React.useState("")
   /*  const [created, setCreated]=React.useState(false) */
    const [isOpenCreated, openCreated, closeCreated]=Funciones(false);
    const titulo="DogsHome"
    const error=useSelector(state=>state.dogsError)

    React.useEffect(()=>{
      dispatch(getDogs())
      dispatch(getTemperaments())
    },[dispatch])

    const indexOfLast=page*cantidadDogs
    const indexOfFirst=indexOfLast-cantidadDogs
    const currentDogs=dogs.slice(indexOfFirst,indexOfLast)  

    const NextPage=(pageNumber)=>{
      if(pageNumber) setPage(pageNumber)
        else if(!pageNumber && page<Math.ceil(dogs.length/cantidadDogs)){
          setPage(page+1)
        }
    }
    const PreviewButton=()=>{
      if(page>1){
        setPage(page-1)
      }}

    
    const Filtro=(e)=>{
      dispatch(filterTemperaments(e.target.value))
      setPage(1)
    }
    const Alfabetico=(e)=>{
      e.preventDefault();
      dispatch(filterAlfabetico(e.target.value))
      setPage(1)
      setOrden(`Ordenado ${e.target.value}`)
    }
    const Peso=(e)=>{
      e.preventDefault();
      dispatch(filterPeso(e.target.value))
      setPage(1)
      setOrden( orden+ `Ordenado ${e.target.value}`)
    }
     
    const Razas=(e)=>{
      dispatch(filterRaza(e.target.value))
      setPage(1)

    }
   const Recargar=()=>{
    dispatch(getDogs())
    setPage(1)
   }

    return (
      <div className="dogs">
      <Navegation titulo={titulo}/>
      <div className="body-dogs">
        <div className="image">
          <img src={image} alt="crear"/>
          <button className="crear" onClick={openCreated}>Created </button>
        </div>
        {error.name  && <Errores name={error.name} />}
     
       <Created isOpen={isOpenCreated} isClose={closeCreated}>
       </Created>
       <div className="div-select">
       <span >Filter by temperaments</span>
       <select className="select" name="Temperaments" onChange={(e)=>Filtro(e)}>
       <option className="opt" value="All">All Temperaments</option>  
        {temperaments && temperaments.map((el)=>(
          <option className="opt" key={el.id} value={el.name}>{el.name}</option>
        ))}
       </select>
       </div>
       <div className="div-select">
       <span >Order by</span>
       <select className="select" onChange={(e)=>Alfabetico(e)}>
        <option className="opt" value="asc"> A-Z</option>
        <option className="opt" value="desc">Z-A</option>
       </select>
       </div>
       <div className="div-select">
        <span >Order by weight</span>
        <select className="select" onChange={(e)=>Peso(e)}>
        <option className="opt" value="asc">Min-Max</option>
        <option className="opt" value="desc">Max-Min</option>
       </select> 
       </div>
       <div className="div-select">
       <span >Filter by breed</span>
       <select className="select" onChange={(e)=>Razas(e)}>
        <option className="opt" value="All">All</option>
        <option className="opt" value="created">Created</option>
        <option  className="opt"value="api">Api</option>
       </select>
       </div>
       <div className="div-select">
       <span >Update page</span>
       <button className="reload" onClick={Recargar}>Reload</button>
       </div>
     
      <div className="paginado">
        <br/>
       {dogs.length>0 &&  <Paginado page={page} cantidadDogs={cantidadDogs} 
        dogs={dogs}
        NextPage={NextPage}
        PreviewButton={PreviewButton}/> }     
        </div>

       <div className="container">
       {dogs.length===0 && <Loader/>}  

       {currentDogs && currentDogs.map((el)=>{ 
          return(
          <div key={parseInt(el.id)} className="contenedor">
          <Dogs 
          id={el.id}
          name={el.name} 
          weightMetric={el.weight?.metric} 
          weightImperial={el.weight.imperial ? el.weight.imperial : null} 
         /*  heightMetric={el.height?.metric} 
          heightImperial={el.height.imperial ? el.height.imperial : null}  
          life_span={el.life_span}  */
           image={el.image?.url ?  el.image.url : el.image? el.image: el.reference_image_id ? `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`: Perrito } 
          temperaments={el.temperament? el.temperament : !el.createdInDb ? el.temperaments : el.temperaments.map(el=>el.name + (", "))} 
          createInDb={el.createdInDb ? "true" : "false"}/> 
          </div>
          )})}
       
        </div>
        </div>
      </div>  
    )
}

export default DogsHome;
