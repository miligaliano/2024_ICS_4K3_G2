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
            <IconButton onClick={handleClick} color="inherit">
                <Avatar>{nombreUsuario[0]}</Avatar>
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
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
            </Menu>
            <Typography variant="body1" sx={{ ml: 1 }}>
                {nombreUsuario}
            </Typography>
        </div>
    );
}
