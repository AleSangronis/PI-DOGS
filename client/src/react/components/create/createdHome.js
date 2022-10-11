import React from "react";
import { useSelector, useDispatch } from  "react-redux";
import {validate} from "./validate.js"
import { getTemperaments, postDog } from "../../../redux/actions/index.js"
import "./createdHome.css"
import { Link } from "react-router-dom";
import Navegation from "../navegation/navegation.js";
import Create from "../../../img/create.png"
import Creado from "./creado.js";

export default function CreatedHome(){
    const dispatch=useDispatch()
    const stateCreado=false;
    const titulo="Created"
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
    const [creado,setCreado]=React.useState(stateCreado)
    let key=790797777;

    const handleOnChange=(e)=>{
        setState({...state, [e.target.name]:e.target.value})
    }
    const enviar=(e)=>{
        e.preventDefault()
        let errors=validate(state)
        setError(errors)
        if(Object.keys(error).length===0){
        dispatch(postDog(state))
        setState(stateInicial) 
        setCreado(true)
        }}


     const handleOnBlur=(e)=>{
        let errors=validate(state)
            setError(errors) 
    } 
    const handleSelect=(e)=>{
        if(!state.temperaments?.includes(e.target.value)){
        setState({
            ...state, temperaments:[...state.temperaments, e.target.value]
        })}}


    const deleteTemp=(e)=>{
       setState({
        ...state, temperaments:state.temperaments.filter(el=>el!==e.target.value)
       })

    }
    const close=(e)=>{
        setState(stateInicial)
    }
    const setearCreado=()=> {
        setCreado(false)
    }
   
    
    return (
        <div key={key++} className="contenedor-created" >
            <Navegation titulo={titulo}/>
            <div className="bandeja">
                <div className="bandeja-img">
                <img className="imageen" src={Create} alt="crear"/>
                <h2 className="h1-img">Created Race</h2>
                </div>
                <div className="created-home"> 
            <div key={key++} className="form"  > 
            <Link to="/dogs"> 
                <button onClick={close} className="but-close">❌</button> 
                </Link>
                <div>
                   <input /* className="input" */ type="text"
                   autoComplete="off"
                   name="name"
                   value={state.name}
                   onChange={handleOnChange}
                   onBlur={(e)=>handleOnBlur(e)}
                   placeholder="Write Breed Name"/>
                   { state.name && error.name && (
                 <p className="danger">{error.name}</p>)}
                </div>
                
                <div >
                
                   <input type="text"
                   autoComplete="off"
                   name="weightmin"
                   value={state.weightmin}
                   onChange={handleOnChange}
                   onBlur={(e)=>handleOnBlur(e)}
                   placeholder="Write Weight Min"/>
                   {state.weightmin && error.weightmin && (
                 <p className="danger">{error.weightmin}</p>)}
                 
                   
                   {/* <label>Weight max   </label> */}
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
                
                <div >
                {/* <label>Height min   </label> */}
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
               {/*     <label>Height max  </label> */}
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
                    {/* <label>Life span  </label> */}
                    <input type="text"
                    autoComplete="off"
                    name="life"
                    value={state.life}
                    onChange={handleOnChange} 
                    placeholder="Write Life Span"/> 
                </div>
               
                <div>
                   {/*  <label>Image   </label> */}
                    <input type="text"
                    autoComplete="off"
                    name="image"
                    value={state.image}
                     onChange={handleOnChange} 
                    placeholder="Write Image Url"/> 
                </div>
                <div>
                  
                  <label>Select Temperaments   </label>
                   <select  className="option"  onChange={(e)=>handleSelect(e)}>
                    {temperamentos && temperamentos.map((el)=>(
                        <option value={el.name}>{el.name}</option>
                    )) }
                    </select> 
                    <p>Temperamentos Seleccionados: </p>
                    {state.temperaments && 
                    <div>
                    {state.temperaments.map(el=>(
                       <label key={el} name={el}>{el} <button  className="eliminar-temp"  value={el} type="button" onClick={deleteTemp}>x</button> </label>
                    ))}
                    </div>}
                </div>
                <br/>
                
               <button onClick={enviar} className="enviar" 
               disabled={!state.name || !state.weightmax || !state.weightmin || !state.heightmax || !state.heightmin || (Object.keys(error).length!==0)? true :false}>Create</button>
               
               

            </div>
            </div>
           
            </div>
            {creado && <Creado setearCreado={setearCreado}/> }
            
            
        </div>
    )

}