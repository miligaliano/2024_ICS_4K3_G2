import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export default function miSelect(){
    const [tipoCarga, setTipoCarga] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setTipoCarga(event.target.value as string);
    };


    return <div>
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
    </div>
}