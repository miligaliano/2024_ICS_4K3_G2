package gurpo2.Backend.Services;

import gurpo2.Backend.Dtos.Request.DatosRequest;
import gurpo2.Backend.Dtos.Response.MockProvinciasLocalidades;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class PedidoService {

    private final MockProvinciasLocalidades mockProvinciasLocalidades;

    public void enviarMail(DatosRequest datosRequest){
        String host = "smtp.gmail.com";
        String port = "587";
        String username = "octavioescudero448@gmail.com";
        String password = "twoc oyep nwgg tbtr";

        EmailSender emailSender = new EmailSender(host, port, username, password);
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        try {
            emailSender.sendEmail("elcorreodemaximiliano@gmail.com", "Nuevo pedido de envío",
                    "Tipo de carga: " + datosRequest.getTipoCarga() +
                    " \nFecha de retiro: " + sdf.format(datosRequest.getFechas().getFechaRetiro()) +
                    " \nFecha de Entrega: " + sdf.format(datosRequest.getFechas().getFechaEntrega()) +
                    " \nDomicilio de retiro: " + datosRequest.getDomicilioRetiro().getCalle() +
                    " \nNumero: " + datosRequest.getDomicilioRetiro().getNumero() +
                    " \nLocalidad de Retiro: " + datosRequest.getDomicilioRetiro().getLocalidad() +
                    " \nProvincia de Retiro: " + datosRequest.getDomicilioRetiro().getProvincia() +
                    " \nReferencia de Retiro: " +datosRequest.getDomicilioRetiro().getReferencia() +
                    " \nDomicilio de entrega: " + datosRequest.getDomicilioEntrega().getCalle() +
                    " \nNumero: " + datosRequest.getDomicilioEntrega().getNumero() +
                    " \nLocalidad de entrega: " + datosRequest.getDomicilioEntrega().getLocalidad() +
                    " \nProvincia de entrega: " + datosRequest.getDomicilioEntrega().getProvincia() +
                    " \nReferencia de entrega: " + datosRequest.getDomicilioEntrega().getReferencia() +
                    " \nFotos: " + " ");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public Map<String, List<String>> getProvinviasYLocalidades() {
        return mockProvinciasLocalidades.getProvinciasYLocalidades();
    }
}
