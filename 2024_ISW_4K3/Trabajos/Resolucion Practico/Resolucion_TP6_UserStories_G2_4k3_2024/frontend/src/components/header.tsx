import {Typography } from "@mui/material"
import clases from "../Styles/Componente.module.css"
import { useState } from "react"

export default function Header(){
    return <div>
        <Typography className={clases.header}>Publicar Pedido de Envio</Typography>
        

    </div>
}


