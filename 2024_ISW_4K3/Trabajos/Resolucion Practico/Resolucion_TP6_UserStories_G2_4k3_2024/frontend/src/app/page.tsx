'use client';

import { postPublicarPedido } from "@/services/publicacionService";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";



export default function Page() {
    const [tipoCarga, setTipoCarga] = useState('');


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

    const handleChange = (event: SelectChangeEvent) => {
        setTipoCarga(event.target.value as string);
      };

    return <div>
        <Grid container spacing={2}> 
           
            
            <Grid  item>
            <Box  sx={{ minWidth: 200 }}>
                <FormControl fullWidth >
                <InputLabel >Tipo de Carga</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tipoCarga}
                    label="Tipo de Carga"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Documentacion</MenuItem>
                    <MenuItem value={20}>Paquete</MenuItem>
                    <MenuItem value={30}>Granos</MenuItem>
                    <MenuItem value={30}>Hacienda</MenuItem>
                </Select>
                </FormControl>
    
            </Box>
        </Grid>   
        
        <Grid item>
            <Button variant="outlined" onClick={publicarPedido}> Publicar pedido</Button>
            <Typography variant="h1"> {datos} </Typography>
            </Grid>


        </Grid>
    </div>
  }