import { useState } from "react";

export const Funciones=(estadoInicial=false)=>{
    let [isOpen,setIsOpen]=useState(estadoInicial)

    const openCreated=()=>setIsOpen(true)
    const closeCreated=()=>setIsOpen(false)

    return [isOpen, openCreated, closeCreated]
}