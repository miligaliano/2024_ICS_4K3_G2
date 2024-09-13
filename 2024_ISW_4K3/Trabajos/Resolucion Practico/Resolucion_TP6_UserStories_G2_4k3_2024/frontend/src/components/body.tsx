import { postPublicarPedido } from "@/services/publicacionService";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar, VariantType } from "notistack";
import { useState } from "react";
import clases from "../Styles/Componente.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Body() {
  const [domicilioRetiro, setDomicilioRetiro] = useState({
    calle: "",
    numero: "",
    localidad: "",
    provincia: "",
    referencia: "",
  });
  const [domicilioEntrega, setDomicilioEntrega] = useState({
    calle: "",
    numero: "",
    localidad: "",
    provincia: "",
    referencia: "",
  });

  const [tipoCarga, setTipoCarga] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState<Dayjs | null>(null);
  const [fechaRetiro, setFechaRetiro] = useState<Dayjs | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [fotos, setFotos] = useState<File[]>([]);
  const [fotoURLs, setFotoURLs] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFotos(files);

    const newFotoURLs = files.map((file) => URL.createObjectURL(file));
    setFotoURLs(newFotoURLs);
  };

  const handleChangeTipoCarga = (event: SelectChangeEvent) => {
    setTipoCarga(event.target.value as string);
  };

  const handleChangeDomicilio = (
    type: "retiro" | "entrega",
    field: string,
    value: string
  ) => {
    if (type === "retiro") {
      setDomicilioRetiro({ ...domicilioRetiro, [field]: value });
    } else {
      setDomicilioEntrega({ ...domicilioEntrega, [field]: value });
    }
  };

  const publicarPedido = async () => {
    try {
      await postPublicarPedido();
      mostrarMensaje("Pedido publicado con éxito", "success");
    } catch (error) {
      mostrarMensaje("No se pudo publicar el pedido", "error");
    }
  };

  const mostrarMensaje = (mensaje: string, variant: VariantType) => {
    enqueueSnackbar(mensaje, { variant });
  };

  console.log("Domicilio Entrega", domicilioEntrega)
  console.log("Domicilio Retiro", domicilioRetiro)
  console.log("fecha Entrega", fechaEntrega)
  console.log("fecha Retiro", fechaRetiro)


  return (
    <div className={clases.body}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            spacing={2}
            sx={{ margin: 1 }}
          >
            <Grid item xs={12}>
              <Accordion sx={{ width: "90%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Tipo de carga y fechas
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    spacing={2}
                    sx={{ margin: 1 }}
                  >
                    <Grid item xs={12}>
                      <FormControl sx={{ width: "76%" }}>
                        <InputLabel>Tipo de Carga</InputLabel>
                        <Select
                          value={tipoCarga}
                          label="Tipo de Carga"
                          onChange={handleChangeTipoCarga}
                        >
                          <MenuItem value={10}>Documentación</MenuItem>
                          <MenuItem value={20}>Paquete</MenuItem>
                          <MenuItem value={30}>Granos</MenuItem>
                          <MenuItem value={40}>Hacienda</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <DatePicker
                        disablePast
                        label="Fecha de Entrega"
                        value={fechaEntrega}
                        onChange={(newValue) => setFechaEntrega(newValue)}
                        renderInput={(params) => (
                          <TextField fullWidth margin="normal" {...params} />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <DatePicker
                        disablePast
                        label="Fecha de Retiro"
                        value={fechaRetiro}
                        onChange={(newValue) => setFechaRetiro(newValue)}
                        renderInput={(params) => (
                          <TextField fullWidth margin="normal" {...params} />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Accordion sx={{ width: "90%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Domicilio de retiro
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    spacing={2}
                    sx={{ margin: 1 }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Calle de Retiro"
                        value={domicilioRetiro.calle}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "retiro",
                            "calle",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        label="Numero"
                        value={domicilioRetiro.numero}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "retiro",
                            "numero",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Localidad de Retiro"
                        value={domicilioRetiro.localidad}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "retiro",
                            "localidad",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl sx={{ width: "76%" }}>
                        <InputLabel>Provincia de Retiro</InputLabel>
                        <Select
                          value={domicilioRetiro.provincia}
                          onChange={(e) =>
                            handleChangeDomicilio(
                              "retiro",
                              "provincia",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Referencia de Retiro"
                        value={domicilioRetiro.referencia}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "retiro",
                            "referencia",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Accordion sx={{ width: "90%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Domicilio de Entrega
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    spacing={2}
                    sx={{ margin: 1 }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        label="Calle de Entrega"
                        value={domicilioEntrega.calle}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "entrega",
                            "calle",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        label="Numero"
                        value={domicilioEntrega.numero}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "entrega",
                            "numero",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Localidad de Entrega"
                        value={domicilioEntrega.localidad}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "entrega",
                            "localidad",
                            e.target.value
                          )
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl sx={{ width: "76%" }}>
                        <InputLabel>Provincia de Entrega</InputLabel>
                        <Select
                          value={domicilioEntrega.provincia}
                          onChange={(e) =>
                            handleChangeDomicilio(
                              "entrega",
                              "provincia",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Referencia de Entrega"
                        value={domicilioEntrega.referencia}
                        onChange={(e) =>
                          handleChangeDomicilio(
                            "entrega",
                            "referencia",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Subir Fotos
                <input
                  accept="image/jpeg,image/png"
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            <Grid item xs={3} md={5}>
              <ImageList
                sx={{ width: "1000%", height: "1000%" }}
                cols={3}
                rowHeight={164}
                style={{ marginTop: 16 }}
              >
                {fotoURLs.map((url, index) => (
                  <ImageListItem key={index}>
                    <img src={url} alt={`Foto ${index + 1}`} loading="lazy" />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={publicarPedido}>
                Publicar pedido
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  );
}
