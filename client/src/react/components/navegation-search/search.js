import React from "react"

import "./search.css"
import { useDispatch, useSelector } from "react-redux"
import {getDogsName} from "../../../redux/actions/index"
import Errores from "../errores/errores"



export default function Search({seteo}){
    const [state, setState]=React.useState("")
    const dispatch=useDispatch()
    const error=useSelector(state=>state.dogsError)


    const handleonChange=(e)=>{
        setState(e.target.value)
    }
    const handeonSubmit= async(e)=>{
        if(state){
        e.preventDefault()
        await dispatch(getDogsName(state))
        seteo()  
        setState("")
        }     
    }
   
    return (
        <>
           
            <input className="input" onChange={handleonChange}
            type="text" name="texto" placeholder='Write Breed Name' value={state} autoComplete="off"/>

           <button onClick={handeonSubmit}
            className="boton-search"><label>Search</label></button> 
         
            <br></br>
            {error.name  && <Errores name={error.name} />}
            
        </>
    )
}