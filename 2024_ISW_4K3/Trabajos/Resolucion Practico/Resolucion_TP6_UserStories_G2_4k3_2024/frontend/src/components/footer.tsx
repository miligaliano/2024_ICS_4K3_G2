import { Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import clases from "../Styles/Componente.module.css";

export default function Footer() {
    return (
        <footer className={clases.footer}>
            <Grid container spacing={4}>
                {/* Sección 1: Nombre de la App */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h5" className={clases.footerTitle}>
                        TANGO APP
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={clases.footerSubtitle}>
                        Creado por el Grupo N° 2
                    </Typography>
                </Grid>

                {/* Sección 2: Enlaces rápidos */}
                {/* <Grid item xs={12} sm={4}>
                    <Typography variant="h6" className={clases.footerSection}>
                        Enlaces rápidos
                    </Typography>
                    <ul className={clases.footerList}>
                        <li>
                            <Link href="/" color="inherit" underline="hover">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" color="inherit" underline="hover">
                                Acerca de
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" color="inherit" underline="hover">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </Grid> */}

                {/* Sección 3: Redes sociales */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" className={clases.footerSection}>
                        Síguenos
                    </Typography>
                    <div className={clases.socialIcons}>
                        <IconButton href="https://facebook.com" color="inherit">
                            <Facebook />
                        </IconButton>
                        <IconButton href="https://twitter.com" color="inherit">
                            <Twitter />
                        </IconButton>
                        <IconButton href="https://instagram.com" color="inherit">
                            <Instagram />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <Typography variant="body2" align="center" className={clases.copyright}>
                &copy; {new Date().getFullYear()} TANGO APP. Todos los derechos reservados.
            </Typography>
        </footer>
    );
}
