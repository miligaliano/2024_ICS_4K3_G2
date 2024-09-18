import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete'; // Importa el ícono para eliminar


export default function Notificaciones({ notificaciones, setNotificaciones }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const eliminarNotificacion = (index) => {
    setNotificaciones((notificaciones) =>
      notificaciones.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <IconButton sx={{color:'#90E0EF'}} onClick={handleClick}>
        <Badge badgeContent={notificaciones.length} sx={{backgroundColor:"#0077B6"}}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {notificaciones.length > 0 ? (
          notificaciones.map((notif, index) => (
            <MenuItem key={index} onClick={handleClose} >
                <Typography variant="body2" sx={{ flexGrow: 1, color:"#90E0EF"}}>
                    {notif}
              </Typography>
              <IconButton
                size="small"
                sx={{color:"#03045E"}}
                onClick={(e) => {
                  e.stopPropagation();
                  eliminarNotificacion(index);
                }}
              >
                <DeleteIcon fontSize="small" 
                />
              </IconButton>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography sx={{color:"#90E0EF"}}>Sin notificaciones</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
