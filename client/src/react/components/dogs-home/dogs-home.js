import React, {useEffect} from "react";
import { getDogs, getTemperaments, filterTemperaments, filterRaza, filterOrdenamiento, pageReload } from "../../../redux/actions"
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
    const reload=useSelector((state)=>state.dogsLanding) 
    const temperaments=useSelector((state)=>state.dogsTemperaments)
    const [orden, setOrden]=React.useState("")
    const [isOpenCreated, openCreated, closeCreated]=Funciones(false);
    const titulo="DogsHome"
    const error=useSelector(state=>state.dogsError)
    let key=882930492;

  useEffect(function reloaded(){
  if(reload!==true){
    dispatch(getDogs())
    dispatch(getTemperaments())
    dispatch(pageReload())
  }
},[reload,dispatch]);

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
      const seteoSearch=()=>{
        setPage(1)
      }

    const Filtro=(e)=>{
      dispatch(filterTemperaments(e.target.value))
      setPage(1)
    }
    const Ordenamiento=(e)=>{
      e.preventDefault();
      dispatch(filterOrdenamiento(e.target.value))
      setPage(1)
      setOrden(`Ordenado ${e.target.value}`)
    }
     
    const Razas=(e)=>{
      dispatch(filterRaza(e.target.value))
      setPage(1)
      setOrden(`Ordenado ${e.target.value}`)

    }
   const Recargar=(e)=>{
    e.preventDefault();
    dispatch(pageReload())
    setPage(1) 
   }
    return (
      <div className="dogs">
      <Navegation titulo={titulo} seteo={seteoSearch}/>
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
       <option className="opt" value="All" >All Temperaments</option>  
        {temperaments && temperaments.map((el)=>(
          <option className="opt" key={el.id} value={el.name}>{el.name}</option>
        ))}
       </select>
       </div>
       <div className="div-select">
       <span >Order by</span>
       <select className="select" onChange={(e)=>Ordenamiento(e)}>
        <option  className="opt" value="asc">A-Z</option>
        <option className="opt" value="desc">Z-A</option>
        <option className="opt" value="p_asc">Min-Max</option>
        <option className="opt" value="p_desc">Max-Min</option>
       </select>
       </div>
    
       <div className="div-select">
       <span >Filter by breed</span>
       <select className="select" onChange={(e)=>Razas(e)}>
        <option className="opt" value="All" >All</option>
        <option className="opt" value="created">Created</option>
        <option  className="opt"value="api">Api</option>
       </select>
       </div>
       <div className="div-select">
       <span >Update page</span>
       <button className="reload" onClick={Recargar}>Reload</button>
       </div>
   
      <div className="paginado">
      
       {dogs.length>0 &&  <Paginado page={page} cantidadDogs={cantidadDogs} 
        dogs={dogs}
        NextPage={NextPage}
        PreviewButton={PreviewButton}/> }     
        </div>

       <div className="container">
       {dogs.length===0 && orden!=="Ordenado created" && <Loader/>}  
       {dogs.length===0 && orden==="Ordenado created" && <h1 className="dogs-h1">No hay creados</h1>}
       {currentDogs && currentDogs.map((el)=>{ 
          return(
          <div key={key++} className="contenedor">
          <Dogs 
          id={el.id}
          name={el.name} 
          weightMetric={el.weight?.metric} 
          weightImperial={el.weight.imperial ? el.weight.imperial : null} 
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
