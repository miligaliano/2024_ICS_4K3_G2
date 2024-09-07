import { API_BACK, apiBack } from "./service_API";



export const postPublicarPedido = async() => {
    try {
        const response = await API_BACK.post(`${apiBack}/publicar`)
    return response.data;
    } catch (error) {
        console.error("error al publicar un pedido: ", error)
        throw error;
    }
    

}