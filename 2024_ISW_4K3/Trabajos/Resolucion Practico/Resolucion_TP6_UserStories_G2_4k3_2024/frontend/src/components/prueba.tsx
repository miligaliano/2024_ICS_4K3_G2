'use client';

import { postPublicarPedido } from "@/services/publicacionService";
import { useState } from "react";
import { Button, Grid, Typography, TextField, Select, MenuItem, InputLabel, FormControl, ImageList, ImageListItem } from "@mui/material";
import * as AdapterDayjs from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import { enqueueSnackbar } from 'notistack';

export default function PublicarPedidoPage() {
    const [tipoCarga, setTipoCarga] = useState("");
    const [domicilioRetiro, setDomicilioRetiro] = useState("");
    const [domicilioEntrega, setDomicilioEntrega] = useState("");
    const [fechaRetiro, setFechaRetiro] = useState<Dayjs | null>(dayjs());
    const [fechaEntrega, setFechaEntrega] = useState<Dayjs | null>(null);
    const [fotos, setFotos] = useState<File[]>([]);
    const [fotoURLs, setFotoURLs] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFotos(files);

        // Convertir archivos en URLs para la previsualización
        const newFotoURLs = files.map((file) => URL.createObjectURL(file));
        setFotoURLs(newFotoURLs);
    };

    const publicarPedido = async () => {
        // Validaciones de fechas
        if (!fechaRetiro || !fechaEntrega) {
            enqueueSnackbar('Por favor, selecciona fechas válidas', { variant: 'error' });
            return;
        }
        if (fechaRetiro.isBefore(dayjs())) {
            enqueueSnackbar('La fecha de retiro debe ser igual o posterior a hoy', { variant: 'error' });
            return;
        }
        if (fechaEntrega.isBefore(fechaRetiro)) {
            enqueueSnackbar('La fecha de entrega debe ser igual o posterior a la fecha de retiro', { variant: 'error' });
            return;
        }

        try {
            // Simular el envío del pedido
            const result = await postPublicarPedido(
            //     {
            //     tipoCarga,
            //     domicilioRetiro,
            //     fechaRetiro: fechaRetiro.toISOString(),
            //     domicilioEntrega,
            //     fechaEntrega: fechaEntrega.toISOString(),
            //     fotos,
            // }
        );
            enqueueSnackbar('Pedido publicado con éxito', { variant: 'success' });
            console.log(result);
        } catch (error) {
            enqueueSnackbar('Error al publicar el pedido', { variant: 'error' });
            console.error("Error al publicar el pedido", error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs.AdapterDayjs} adapterLocale="es">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        Publicar Pedido de Envío
                    </Typography>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Tipo de Carga</InputLabel>
                        <Select value={tipoCarga} onChange={(e) => setTipoCarga(e.target.value)}>
                            <MenuItem value="documentacion">Documentación</MenuItem>
                            <MenuItem value="paquete">Paquete</MenuItem>
                            <MenuItem value="granos">Granos</MenuItem>
                            <MenuItem value="hacienda">Hacienda</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Domicilio de Retiro"
                        fullWidth
                        margin="normal"
                        value={domicilioRetiro}
                        onChange={(e) => setDomicilioRetiro(e.target.value)}
                    />

                    <DatePicker
                        label="Fecha de Retiro"
                        value={fechaRetiro}
                        onChange={(newValue) => setFechaRetiro(newValue)}
                        renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                    />

                    <TextField
                        label="Domicilio de Entrega"
                        fullWidth
                        margin="normal"
                        value={domicilioEntrega}
                        onChange={(e) => setDomicilioEntrega(e.target.value)}
                    />

                    <DatePicker
                        label="Fecha de Entrega"
                        value={fechaEntrega}
                        onChange={(newValue) => setFechaEntrega(newValue)}
                        renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                    />

                    {/* Botón para cargar fotos */}
                    <Button
                        variant="outlined"
                        component="label"
                        style={{ marginTop: '0.7em', marginLeft:'2em'}}
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

                    {/* Visualizador de fotos */}
                    <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={164} style={{ marginTop: 16 }}>
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

                    <Button variant="contained" color="primary" fullWidth onClick={publicarPedido} style={{ marginTop: 16 }}>
                        Publicar Pedido
                    </Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}
