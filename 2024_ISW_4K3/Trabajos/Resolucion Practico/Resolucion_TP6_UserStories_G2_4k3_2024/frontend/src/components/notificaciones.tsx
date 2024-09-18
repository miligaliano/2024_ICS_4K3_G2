import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

export default function Notificaciones() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const notificaciones = [
        "Notif 1",
        "Notif 2",
        "Notif 3",
        "Notif 4",
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={notificaciones.length} color="error">
                    <NotificationsIcon />
                </Badge>
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
                {notificaciones.length > 0 ? (
                    notificaciones.map((notificacion, index) => (
                        <MenuItem key={index} onClick={handleClose}>
                            {notificacion}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>
                        <Typography variant="body2">
                            Sin notificaciones
                        </Typography>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
