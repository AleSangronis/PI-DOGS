import React from "react";
import Error from "../../../img/icons-error.png"
import "./errores.css"
import { DeleteErrores}  from "../../../redux/actions"
import { useDispatch} from  "react-redux";
import { Link } from "react-router-dom";



export default function Errores ({ name , home }){

    const dispatch=useDispatch()
    const setear=()=>{
        dispatch(DeleteErrores())
    }

    return(
        <div className="errores">
            <div className="error">
                <span>Oh No! </span>
                <span>{name}</span>
               <img src={Error} alt="check"></img>
               <div className="buttons">
                {home &&
                <Link to={home}>
               <button className="but-cerrar" onClick={setear}>❌</button>
               </Link>}
               {!home &&
               <button className="but-cerrar" onClick={setear}>❌</button>}
               </div> 
            </div>
        </div>
    )

}