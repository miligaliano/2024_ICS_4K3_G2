import { postPublicarPedido } from "@/services/publicacionService";
import { Button, FormControl, Grid, ImageList, ImageListItem, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar, VariantType } from "notistack";
import { useState } from "react";
import clases from "../Styles/Componente.module.css"


export default function Body(){
    
    const [domicilioRetiro, setDomicilioRetiro] = useState("");
    const [domicilioEntrega, setDomicilioEntrega] = useState("");

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

    return <div className={clases.body}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">

       <Grid container spacing={2} >  
        <Grid container spacing={2} className={clases.mainGrid}>
            <Grid className={clases.campos}>
                <FormControl fullWidth >
                    <InputLabel>Tipo de Carga</InputLabel>
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

            <Grid item xs={4} className={clases.campos} >
                <DatePicker 
                    disablePast
                    label="Fecha de Entrega"
                    value={fechaEntrega}
                    onChange={(newValue) => setFechaEntrega(newValue)}
                    renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                />
            </Grid>

            <Grid item xs={4} className={clases.campos}>
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
            <Grid item xs={3} md={6.5}>
                <TextField
                    label="Domicilio de Entrega"
                    fullWidth
                    value={domicilioEntrega}
                    onChange={(e) => setDomicilioEntrega(e.target.value)}
                    />
            </Grid> 
        </Grid>

        <Grid container spacing={2} sx={{marginLeft: 1, marginTop: 0.5}} justifyContent={"center"}>
            <Grid item xs={3} md={6.5}>
                <TextField
                    label="Domicilio de Retiro"
                    fullWidth
                    value={domicilioRetiro}
                    onChange={(e) => setDomicilioRetiro(e.target.value)}
                    />
            </Grid> 
        </Grid>

        <Grid container spacing={2} className={clases.btnFotos}>
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

        <Grid container spacing={2} className={clases.btnPedido}>
            <Grid item xs={6} md={7}>

                
                <Button variant="contained" onClick={publicarPedido} className={clases.boton}> Publicar pedido</Button>
                
            </Grid>

            </Grid>
        </Grid>
        </LocalizationProvider>
    </div>
}