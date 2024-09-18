// UsuarioLogueado.js
import { IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

export default function UsuarioLogueado({ nombreUsuario }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick} sx={{color:"#90E0EF"}}>
                <Avatar sx={{backgroundColor:"#90E0EF", color:"#CAF0F8"}}>{nombreUsuario[0]}</Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose} sx={{ color:"#03045E"}}>Perfil</MenuItem>
                <MenuItem onClick={handleClose} sx={{ color:"#03045E"}}>Cerrar Sesión</MenuItem>
            </Menu>
            <Typography variant="body1" sx={{ ml: 1 }} sx={{color:"#CAF0F8"}}>
                {nombreUsuario}
            </Typography>
        </div>
    );
}
