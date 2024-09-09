'use client';

import { postPublicarPedido } from "@/services/publicacionService";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {  useState } from "react";
import { VariantType, useSnackbar } from 'notistack';



export default function App() {
    const [tipoCarga, setTipoCarga] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event: SelectChangeEvent) => {
        setTipoCarga(event.target.value as string);
    };


    const publicarPedido = async () => {
        try {
            await postPublicarPedido();
            mostrarMensaje("Pedido publicado con éxito", "success"); 
        } catch (error) {
            mostrarMensaje("No se pudo publicar el pedido", "error"); 
        }
    };

    const mostrarMensaje = (mensaje: string, variant: VariantType) => {
        enqueueSnackbar(mensaje, {variant});
      };


    return <div>
        <Grid container spacing={2}> 
        <Grid  item>
        <Box sx={{ minWidth: 200 }}>
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
            </Grid>
        </Grid>
        
    </div>
  }