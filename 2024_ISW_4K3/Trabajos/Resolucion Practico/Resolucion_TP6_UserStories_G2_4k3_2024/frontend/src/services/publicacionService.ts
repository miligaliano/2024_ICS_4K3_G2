import { API_BACK, apiBack } from "./service_API";



export const postPublicarPedido = async() => {
    const response = await API_BACK.post(`${apiBack}/publicar`)
    try {
    return response.data;
    } catch (error) {
        throw error;
    }
}