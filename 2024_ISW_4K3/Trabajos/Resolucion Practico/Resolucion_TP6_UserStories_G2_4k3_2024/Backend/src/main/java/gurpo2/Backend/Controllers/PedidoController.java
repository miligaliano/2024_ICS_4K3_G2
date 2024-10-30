package gurpo2.Backend.Controllers;

import gurpo2.Backend.Dtos.Request.DatosRequest;
import gurpo2.Backend.Dtos.Response.MockProvinciasLocalidades;
import gurpo2.Backend.Services.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping("/publicar")
    public ResponseEntity<String> publicarEnvio( @RequestBody @Valid DatosRequest datosRequest){
        pedidoService.enviarMail(datosRequest);
        return ResponseEntity.ok("Pedido publicado");
    }

    @GetMapping("/provincias-localidades")
    public ResponseEntity<Map<String, List<String>>> getProvinciasLocalidades() {
        return ResponseEntity.ok(pedidoService.getProvinviasYLocalidades());

    }

}
