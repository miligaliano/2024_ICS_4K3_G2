import { API_BACK, apiBack } from "./service_API";



export const postPublicarPedido = async(parametros:any) => {
    const response = await API_BACK.post(`${apiBack}/publicar`,parametros)
    try {
    return response.data;
    } catch (error) {
        throw error;
    }
}

export const obtenerProvinciasYLocalidades = async() => {
    const response = await API_BACK.get(`${apiBack}/provincias-localidades`)
    try {
    return response.data;
    } catch (error) {
        throw error;
    }
}