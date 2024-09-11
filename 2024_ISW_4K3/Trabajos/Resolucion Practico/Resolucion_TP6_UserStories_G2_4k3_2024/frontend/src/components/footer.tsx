import { Typography } from "@mui/material";
import clases from "../Styles/Componente.module.css"

export default function Footer(){

    return <div>
            <Typography className={clases.footer}>
                <h2 className={clases.pie}>TANGO APP</h2>
            </Typography>
    </div>
}
