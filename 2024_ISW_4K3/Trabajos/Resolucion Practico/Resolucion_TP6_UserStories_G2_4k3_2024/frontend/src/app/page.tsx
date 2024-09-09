'use client';


import MiSelect from "@/components/MiSelect";
import { postPublicarPedido } from "@/services/publicacionService";
import { Alert, Button, Grid, IconButton, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import { Fragment, SyntheticEvent, useState } from "react";



export default function Page() {
    


    const [datos, setDatos] = useState<string>("")
    const [open, setOpen] = useState(false);

    const publicarPedido = async () =>{
        

        const result = await postPublicarPedido()
        setDatos(result)
        try {
            setOpen(true);
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}>
                </Snackbar>
        }catch (error) {
            setOpen(true);
            <Alert severity="error">
                No se pudo publciar
            </Alert>
        }        
    }
    
      const handleClose = (
        event: SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const action = (
        <Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      );

    return <div>
        <Grid container spacing={2}> 
           
            
        <Grid  item>
            <MiSelect>
            </MiSelect>
        </Grid>   
        
        <Grid item>
            <Button variant="outlined" onClick={publicarPedido}> Publicar pedido</Button>
            <Typography variant="h1"> {datos} </Typography>
            </Grid>


        </Grid>
    </div>
  }