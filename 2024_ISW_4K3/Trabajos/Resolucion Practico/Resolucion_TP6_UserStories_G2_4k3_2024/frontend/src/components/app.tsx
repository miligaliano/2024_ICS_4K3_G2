'use client';

import { postPublicarPedido } from "@/services/publicacionService";
import { Button, FormControl, Grid, ImageList, ImageListItem, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { VariantType, useSnackbar } from 'notistack';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function App() {

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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Paper elevation={24} sx={{ padding: 3, margin: { xs: 2, sm: 3, md: 4 }, maxWidth: 'lg', mx: 'auto' }}>
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
                    Publicar Pedido de Envío
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo de Carga</InputLabel>
                            <Select
                                labelId="tipo-carga-select-label"
                                id="tipo-carga-select"
                                value={tipoCarga}
                                label="Tipo de Carga"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Documentacion</MenuItem>
                                <MenuItem value={20}>Paquete</MenuItem>
                                <MenuItem value={30}>Granos</MenuItem>
                                <MenuItem value={40}>Hacienda</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker
                            disablePast
                            label="Fecha de Entrega"
                            value={fechaEntrega}
                            onChange={(newValue) => setFechaEntrega(newValue)}
                            renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker
                            disablePast
                            label="Fecha de Retiro"
                            value={fechaRetiro}
                            onChange={(newValue) => setFechaRetiro(newValue)}
                            renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <TextField
                            label="Domicilio de Entrega"
                            fullWidth
                            value={domicilioEntrega}
                            onChange={(e) => setDomicilioEntrega(e.target.value)}
                            placeholder="Escriba la dirección"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <TextField
                            label="Domicilio de Retiro"
                            fullWidth
                            value={domicilioRetiro}
                            onChange={(e) => setDomicilioRetiro(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
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

                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <ImageList sx={{ width: '100%', height: 300 }} cols={3} rowHeight={164}>
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

                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={8} md={6}>
                        <Button variant="contained" onClick={publicarPedido} fullWidth>
                            Publicar pedido
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </LocalizationProvider>
    );
}
