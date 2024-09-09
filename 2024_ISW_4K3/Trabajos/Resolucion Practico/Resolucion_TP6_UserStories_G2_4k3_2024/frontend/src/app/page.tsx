'use client';

import MiSelect from "@/components/MiSelect";
import { postPublicarPedido } from "@/services/publicacionService";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";



export default function Page() {
    


    const [datos, setDatos] = useState<string>("")


    const publicarPedido = async () =>{
        try {
            const result = await postPublicarPedido()
            console.log(result)
            setDatos(result)
        }catch (error) {
            console.log("Error al ejecutar la simulaicon")
        }        
    }

   

    return <div>
        <Grid container spacing={2}> 
           
            
        <Grid  item>
            <MiSelect>
            </MiSelect>
        </Grid>   
        
        <Grid item>
            <Button variant="outlined" onClick={publicarPedido}> Publicar pedido</Button>
            <Typography variant="h1"> {datos} </Typography>
            </Grid>


        </Grid>
    </div>
  }