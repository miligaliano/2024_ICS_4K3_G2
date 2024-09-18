import { Typography } from "@mui/material";
import clases from "../Styles/Componente.module.css";
import Notificaciones from "./notificaciones";
import UsuarioLogueado from "./User";

export default function Header() {
    return (
        <div className={clases.header}>
            <Typography className={clases.titulo}>
                Publicar Pedido de Envio
            </Typography>
            <div className={clases.iconos}>
                <Notificaciones />
                <UsuarioLogueado nombreUsuario="Marchiori Nicolas" />
            </div>
        </div>
    );
}



