package gurpo2.Backend.Controllers;

import gurpo2.Backend.Dtos.Request.DatosRequest;
import gurpo2.Backend.Services.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping("/publicar")
    public ResponseEntity<String> publicarEnvio( @RequestBody @Valid DatosRequest datosRequest){
        System.out.println(datosRequest);
        System.out.println(datosRequest.getDomicilioEntrega());
        System.out.println(datosRequest.getDomicilioRetiro());
        pedidoService.enviarMail();
        //return ResponseEntity.badRequest().build();
        return ResponseEntity.ok("Pedido publicado");
    }

}
