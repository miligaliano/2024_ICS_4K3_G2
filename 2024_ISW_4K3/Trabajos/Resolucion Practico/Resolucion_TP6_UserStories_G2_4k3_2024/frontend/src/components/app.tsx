'use client';

import { postPublicarPedido } from "@/services/publicacionService";
import { Button, FormControl, Grid, ImageList, ImageListItem, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {  useState } from "react";
import { VariantType, useSnackbar } from 'notistack';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



export default function App() {

    const [domicilioRetiro, setDomicilioRetiro] = useState("");
    const [domicilioEntrega, setdomicilioEntrega] = useState("");

    const [tipoCarga, setTipoCarga] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState<Dayjs | null>(null);
    const [fechaRetiro, setFechaRetiro] = useState<Dayjs | null>(dayjs());
    const { enqueueSnackbar } = useSnackbar();
    const [fotos, setFotos] = useState<File[]>([]);
    const [fotoURLs, setFotoURLs] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFotos(files);

        // Convertir archivos en URLs para la previsualización
        const newFotoURLs = files.map((file) => URL.createObjectURL(file));
        setFotoURLs(newFotoURLs);
    };

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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Paper elevation={24} sx={{marginLeft: 50, marginRight: 60, padding: 2}}>
        <Grid container spacing={2} > 

        <Grid item xs={4} md={12} sx={{padding: 4}}>
            <Typography variant="h4">
                Publicar Pedido de Envío
            </Typography>
        </Grid>
        

        <Grid container spacing={2} sx={{marginLeft: 1}} justifyContent={"center"}>
            <Grid item xs={4} md={3}>
                <FormControl fullWidth>
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
            </Grid>  

            <Grid item xs={4} md={2}>
                <DatePicker 
                    disablePast
                    label="Fecha de Entrega"
                    value={fechaEntrega}
                    onChange={(newValue) => setFechaEntrega(newValue)}
                    renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                />
            </Grid>

            <Grid item xs={4} md={2}>
                <DatePicker
                    disablePast
                    label="Fecha de Retiro"
                    value={fechaRetiro}
                    onChange={(newValue) => setFechaRetiro(newValue)}
                    renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                />
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{marginLeft: 1, marginTop: 0.5}} justifyContent={"center"}>
            <Grid item xs={3} md={7}>
                <TextField
                    label="Domicilio de Entrega"
                    fullWidth
                    value={domicilioEntrega}
                    onChange={(e) => setDomicilioRetiro(e.target.value)}
                    />
            </Grid> 
        </Grid>

        <Grid container spacing={2} sx={{marginLeft: 1, marginTop: 0.5}} justifyContent={"center"}>
            <Grid item xs={3} md={7}>
                <TextField
                    label="Domicilio de Retiro"
                    fullWidth
                    value={domicilioRetiro}
                    onChange={(e) => setDomicilioRetiro(e.target.value)}
                    />
            </Grid> 
        </Grid>

        <Grid container spacing={2} sx={{marginLeft: 1, marginTop: 0.5}} justifyContent={"center"}>
            <Grid item xs={3} md={7}>
                <Button
                    variant="outlined"
                    component="label"
                    >
                    Subir Fotos
                    <input
                        accept="image/jpeg,image/png"
                        type="file"
                        multiple
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
            </Grid> 
        </Grid>

        <Grid container spacing={2} sx={{marginLeft: 1, marginTop: 0.5}} justifyContent={"center"}>
            <Grid item xs={3} md={5}>
                <ImageList sx={{ width: '300%', height: 300 }} cols={3} rowHeight={164} style={{ marginTop: 16 }}>
                    {fotoURLs.map((url, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={url}
                                alt={`Foto ${index + 1}`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
        </Grid>

        <Grid container spacing={2} sx={{marginLeft: 1, marginTop: 0.5}} justifyContent={"center"}>
            <Grid item xs={6} md={7}>
                <Button variant="contained" onClick={publicarPedido}> Publicar pedido</Button>
                </Grid>
            </Grid>
        </Grid>

        </Paper>
        </LocalizationProvider>
    </div>
  }