import {
  obtenerProvinciasYLocalidades,
  postPublicarPedido,
} from "@/services/publicacionService";
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
import "dayjs/locale/es";
dayjs.locale("es");
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useState } from "react";
import clases from "../Styles/Componente.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Body({notificaciones, setNotificaciones}) {
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
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [localidadesRetiro, setLocalidadesRetiro] = useState([]);
  const [localidadesEntrega, setLocalidadesEntrega] = useState([]);

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
    if (!fechaRetiro || !fechaEntrega) {
      enqueueSnackbar("Por favor, selecciona fechas validas", {
        variant: "error", style:{backgroundColor:"#03045E", color:"#00B4D8"}
      });
      setNotificaciones((notificaciones) => [...notificaciones, "No se pudo publicar el pedido"]);
      return;
    }

    if (fechaRetiro.isBefore(dayjs().day() - 1)) {
      enqueueSnackbar("La fecha de retiro debe ser igual o posterior a hoy", {
        variant: "error", style:{backgroundColor:"#03045E", color:"#00B4D8"}
      });
      setNotificaciones((notificaciones) => [...notificaciones, "No se pudo publicar el pedido"]);
      return;
    }

    if (fechaEntrega.isBefore(fechaRetiro)) {
      enqueueSnackbar(
        "La fecha de entrega debe ser igual o posterior a la fecha de retiro",
        { variant: "error" , style:{backgroundColor:"#03045E", color:"#00B4D8"}}
      );
      setNotificaciones((notificaciones) => [...notificaciones, "No se pudo publicar el pedido"]);
      return;
    }

    const parametros = {
      tipoCarga: tipoCarga,

      fechas: {
        fechaEntrega: fechaEntrega,
        fechaRetiro: fechaRetiro,
      },

      domicilioEntrega: {
        calle: domicilioEntrega.calle,
        numero: domicilioEntrega.numero,
        localidad: domicilioEntrega.localidad,
        provincia: domicilioEntrega.provincia,
        referencia: domicilioEntrega.referencia,
      },
      domicilioRetiro: {
        calle: domicilioRetiro.calle,
        numero: domicilioRetiro.numero,
        localidad: domicilioRetiro.localidad,
        provincia: domicilioRetiro.provincia,
        referencia: domicilioRetiro.referencia,
      },
    };
    
    
    try {
      await postPublicarPedido(parametros);
      mostrarMensaje("Pedido publicado con éxito", "success", );
      setNotificaciones((notificaciones) => [...notificaciones, "Pedido publicado con éxito"]);
    } catch (error) {
      mostrarMensaje("No se pudo publicar el pedido", "error");
      setNotificaciones((notificaciones) => [...notificaciones, "No se pudo publicar el Pedido"]);
    }
  };

  const mostrarMensaje = (mensaje: string, variant: VariantType) => {
    if (variant === 'success'){
      enqueueSnackbar(mensaje, { variant, style:{backgroundColor:"#00B4D8", color:"#CAF0F8"} });
    } else{
      enqueueSnackbar(mensaje, { variant, style:{backgroundColor:"#03045E", color:"#CAF0F8"} });
    }
  };

  useEffect(() => {
    const fetchProvinciasLocalidades = async () => {
      try {
        const data = await obtenerProvinciasYLocalidades();
        setData1(data);
        setData2(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchProvinciasLocalidades();
  }, []);

  useEffect(() => {
    if (domicilioRetiro.provincia) {
      setLocalidadesRetiro(data1[domicilioRetiro.provincia] || []);
      handleChangeDomicilio("retiro", "localidad", "");
    }
  }, [domicilioRetiro.provincia, data1]);

  useEffect(() => {
    if (domicilioEntrega.provincia) {
      setLocalidadesEntrega(data2[domicilioEntrega.provincia] || []);
      handleChangeDomicilio("entrega", "localidad", "");
    }
  }, [domicilioEntrega.provincia, data2]);


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
              <Accordion sx={{ width: "90%", Color:"#90E0EF" }}>
              <AccordionSummary sx={{backgroundColor:"#0077B6", color:"#CAF0F8"}}
                  expandIcon={<ExpandMoreIcon sx={{color:"#90E0EF"}}/>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Tipo de carga y fechas
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor:"#CAF0F8"}}>
                  <Grid
                    container
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    spacing={2}
                    sx={{ margin: 1}}
                  >
                    <Grid item xs={12}>
                      <FormControl sx={{ width: "76%", backgroundColor:"#CAF0F8" }}>
                        <InputLabel>Tipo de Carga</InputLabel>
                        <Select sx={{backgroundColor:"#CAF0F8"}}
                          value={tipoCarga}
                          label="Tipo de Carga"
                          onChange={handleChangeTipoCarga}
                        >
                          <MenuItem value={"Documentacion"}>
                            Documentación
                          </MenuItem>
                          <MenuItem value={"Paquete"}>Paquete</MenuItem>
                          <MenuItem value={"Granos"}>Granos</MenuItem>
                          <MenuItem value={"Hacienda"}>Hacienda</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <DatePicker
                        disablePast
                        label="Fecha de Retiro"
                        value={fechaRetiro}
                        onChange={(newValue) => setFechaRetiro(newValue)}
                        renderInput={(params) => (
                          <TextField sx={{backgroundColor:"#CAF0F8"}} fullWidth margin="normal" {...params} />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <DatePicker
                        disablePast
                        label="Fecha de Entrega"
                        value={fechaEntrega}
                        onChange={(newValue) => setFechaEntrega(newValue)}
                        renderInput={(params) => (
                          <TextField sx={{backgroundColor:"#CAF0F8"}} fullWidth margin="normal" {...params} />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Accordion sx={{ width: "90%" }}>
              <AccordionSummary sx={{backgroundColor:"#0077B6", color:"#CAF0F8"}}
                  expandIcon={<ExpandMoreIcon sx={{color:"#90E0EF"}}/>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Domicilio de retiro
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor:"#CAF0F8", color:"#90E0EF"}}>
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
                          {Object.keys(data1).map((provincia) => (
                            <MenuItem key={provincia} value={provincia}>
                              {provincia}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl sx={{ width: "76%" }}>
                        <InputLabel>Localidad de Retiro</InputLabel>
                        <Select
                          value={domicilioRetiro.localidad}
                          onChange={(e) =>
                            handleChangeDomicilio(
                              "retiro",
                              "localidad",
                              e.target.value
                            )
                          }
                        >
                          {localidadesRetiro.map((localidad) => (
                            <MenuItem key={localidad} value={localidad}>
                              {localidad}
                            </MenuItem>
                          ))}
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
              <AccordionSummary sx={{backgroundColor:"#0077B6", color:"#CAF0F8"}}
                  expandIcon={<ExpandMoreIcon sx={{color:"#90E0EF"}}/>}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Domicilio de Entrega
                </AccordionSummary>
                <AccordionDetails sx={{backgroundColor:"#CAF0F8", color:"#90E0EF"}}>
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
                      <FormControl sx={{ width: "76%" }}>
                        <InputLabel>Provincia de entrega</InputLabel>
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
                          {Object.keys(data2).map((provincia) => (
                            <MenuItem key={provincia} value={provincia}>
                              {provincia}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl sx={{ width: "76%" }}>
                        <InputLabel>Localidad de Entrega</InputLabel>
                        <Select
                          value={domicilioEntrega.localidad}
                          onChange={(e) =>
                            handleChangeDomicilio(
                              "entrega",
                              "localidad",
                              e.target.value
                            )
                          }
                        >
                          {localidadesEntrega.map((localidad) => (
                            <MenuItem key={localidad} value={localidad}>
                              {localidad}
                            </MenuItem>
                          ))}
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
              <Button
                variant="contained"
                component="label"
                className={clases.btnColor}
              >
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
              <Button
                variant="contained"
                disabled={false}
                onClick={publicarPedido}
                className={clases.btnColor}
              >
                Publicar pedido
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  );
}
