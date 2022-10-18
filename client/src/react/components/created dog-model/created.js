 import React from "react";
import { useSelector, useDispatch } from  "react-redux";
import {validate} from "./validate_created.js"
import { getTemperaments, postDog, getDogs } from "../../../redux/actions/index.js"
import "./created.css"
import { Link } from "react-router-dom";

export default function Created({ isOpen, isClose }){
    const dispatch=useDispatch()
    const stateInicial={
        name:"",
        weightmin:"",
        weightmax:"",
        heightmin:"",
        heightmax:"",
        life:"",
        image:"",
        temperaments:[]
    }
    React.useEffect(()=>{
        dispatch(getTemperaments())
    },[dispatch]) 

    const temperamentos=useSelector(state=>state.dogsTemperaments)
    const [state,setState]=React.useState(stateInicial)
    const [error,setError]=React.useState({})
    const dogs=useSelector(state=>state.dogsLoaded)

    let key=1235445

    const handleOnChange=(e)=>{
        setState({...state, [e.target.name]:e.target.value})
    }
    const enviar=(e)=>{
        e.preventDefault()
        if(Object.keys(error).length===0){
        dispatch(postDog(state))
        setState(stateInicial)
        dispatch(getDogs())

        }}


     const handleOnBlur=(e)=>{
        let filter=dogs.filter(el=>el.name===state.name)
        let errors=validate(state,filter)
            setError(errors) 
    } 
    const handleSelect=(e)=>{
        if(!state.temperaments?.includes(e.target.value)){
        setState({
            ...state, temperaments:[...state.temperaments, e.target.value]
        })}}
    const handleCreatedContainer=(e)=>e.stopPropagation();

    const deleteTemp=(e)=>{
       setState({
        ...state, temperaments:state.temperaments.filter(el=>el!==e.target.value)
       })

    }
    const close=(e)=>{
        setState(stateInicial)
        isClose()

    }
   
    
    return (
        <div key={key++} className={`created ${isOpen && "open"}`}  onClick={isClose} >
            <form onSubmit={enviar} key={key++} className="created-container"  onClick={handleCreatedContainer} > 
            <div className="race">
            <h2 className="h1">Created Race</h2>
            </div>
                <div className="form">
                   <input  type="text"
                   autoComplete="off"
                   name="name"
                   value={state.name}
                   onChange={handleOnChange}
                   onBlur={(e)=>handleOnBlur(e)}
                   placeholder="Write Breed Name"/>
                   { state.name && error.name && (
                 <p className="danger">{error.name}</p>)}
                </div>
                
                <div>
                
                   <input type="text"
                   autoComplete="off"
                   name="weightmin"
                   value={state.weightmin}
                   onChange={handleOnChange}
                   onBlur={(e)=>handleOnBlur(e)}
                   placeholder="Write Weight Min"/>
                   {state.weightmin && error.weightmin && (
                 <p className="danger">{error.weightmin}</p>)}
                 
                   <br/>
                   <input type="text"
                   autoComplete="off"
                   name="weightmax"
                   value={state.weightmax}
                   onChange={handleOnChange}
                   onBlur={(e)=>handleOnBlur(e)}
                   placeholder="Write Weight Max"/>
                   {state.weightmax && error.weightmax && (
                 <p className="danger">{error.weightmax}</p>)}
                </div>
                
                <div>
              
                   <input type="text"
                   name="heightmin"
                   autoComplete="off"
                   value={state.heightmin}
                   onChange={handleOnChange}
                    onBlur={(e)=>handleOnBlur(e)} 
                   placeholder="Write Height Min"/>
                   {state.heightmin && error.heightmin && (
                 <p className="danger">{error.heightmin}</p>)}
                     <br/>
               
                   <input type="text"
                   autoComplete="off"
                   name="heightmax"
                   value={state.heightmax}
                   onChange={handleOnChange}
                    onBlur={(e)=>handleOnBlur(e)} 
                   placeholder="Write Height Max"/>
                   {state.heightmax && error.heightmax && (
                 <p className="danger">{error.heightmax}</p>)}
                </div>
                
                <div>
              
                    <input type="text"
                    autoComplete="off"
                    name="life"
                    value={state.life}
                    onChange={handleOnChange} 
                    placeholder="Write Life Span"/> 
                </div>
               
                <div>
                 
                    <input type="text"
                    autoComplete="off"
                    name="image"
                    value={state.image}
                     onChange={handleOnChange} 
                    placeholder="Write Image Url"/> 
                </div>
                <div>
                  
                  <label>Select Temperaments   </label>
                   <select className="option" onChange={(e)=>handleSelect(e)}>
                    {temperamentos && temperamentos.map((el)=>(
                        <option key={el.name} value={el.name}>{el.name}</option>
                    )) }
                    </select> 
                    <p>Temperamentos Seleccionados: </p>
                    {state.temperaments && 
                    <div>
                    {state.temperaments.map(el=>(
                       <label key={el} name={el}>{el} <button className="eliminar-temp" value={el} type="button" onClick={deleteTemp}>x</button> </label>
                    ))}
                    </div>}
                </div>
                <br/>
                
               <button type="Submit" className="enviar"
               disabled={!state.name || !state.weightmax || !state.weightmin || !state.heightmax || !state.heightmin || (Object.keys(error).length!==0)? true :false}>Create</button>
               
               <div>
                <Link to="/dogs">
                <button className="created-close" onClick={close}>X</button> 
                </Link>
                </div>

            </form>
        </div>
    )

}